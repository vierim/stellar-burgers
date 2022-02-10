import React from "react";
import { CONFIG } from "../../utils/constants";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ShowLoading from "../show-loading/show-loading";
import ErrorNotification from "../error-notification/error-notification";
import { IngredientsContext } from "../../services/appContext";
import styles from "./app.module.css";

function App() {
  const [ingredients, setIngredients] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const [modals, setModals] = React.useState({
    visible: false,
    detailsModal: false,
    orderModal: false,
    data: {},
  });

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIngredients({ 
      ...ingredients, 
      hasError: false, 
      isLoading: true 
    });

    fetch(`${CONFIG.BASE_URL}/ingredients`, {
      headers: CONFIG.HEADERS,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res);
      })
      .then((res) => {
        setIngredients({
          hasError: !res.success,
          data: res.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        setIngredients({ ...ingredients, hasError: true, isLoading: false });

        if (err.json) {
          console.error(`Произошла ошибка при загрузке ингредиентов. Тип ошибки: ${err.status} ${err.statusText}`);
        }
      });
  };

  function handleOpenModal(id, e) {
    if (e.currentTarget.type === "submit") {
      fetch(`${CONFIG.BASE_URL}/orders`, {
        method: 'POST',
        headers: CONFIG.HEADERS,
        body: JSON.stringify({
          "ingredients": id,
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          return Promise.reject(res);
        })
        .then((res) => {
          setModals({ 
            visible: true, 
            detailsModal: false, 
            orderModal: true,
            data: res.order.number,
          });
        })
        .catch((err) => {
          if (!err.json) {
            console.error("Произошла ошибка при создании заказа. :( Попробуйте еще раз. ");
          } else {
            console.error(`Произошла ошибка при создании заказа. Тип ошибки: ${err.status} ${err.statusText}`);
          }
        })
    } else {
      const { name, image_large, calories, proteins, fat, carbohydrates } =
        ingredients.data.find((el) => el._id === id);

      setModals({
        visible: true,
        detailsModal: true,
        orderModal: false,
        data: { 
          name, 
          image_large, 
          calories, 
          proteins, 
          fat, 
          carbohydrates 
        },
      });
    }
  }

  const closeModal = () => setModals({ visible: false, detailsModal: false, orderModal: false, data: {} });

  const { isLoading, hasError } = ingredients;

  return (
    <div className={styles.app}>
      {modals.visible && (
        <Modal closeModal={closeModal}>
          {modals.detailsModal && <IngredientDetails data={modals.data} />}
          {modals.orderModal && <OrderDetails orderId={modals.data} />}
        </Modal>
      )}
      <AppHeader />
      {isLoading && <ShowLoading />}
      {hasError && <ErrorNotification />}
      {!isLoading && !hasError && ingredients.data.length && (
        <main className={styles.content}>
          <IngredientsContext.Provider value={{ ingredients }}>
            <BurgerIngredients 
              openPopupWindow={handleOpenModal} 
            />
            <BurgerConstructor 
              openPopupWindow={handleOpenModal} 
            />
          </IngredientsContext.Provider>
        </main>
      )}
    </div>
  );
}

export default App;
