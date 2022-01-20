import React from 'react';
import { allIngridients } from '../../utils/data.js';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientsElement from '../ingridients-element/ingridients-element';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('one');
  const [types, setTypes] = React.useState([]);
  const [basicTypes] = React.useState({
    bun: 'Булки',
    main: 'Начинки',
    sauce: 'Соусы',
  });

  React.useEffect(() => {
    getTypes();
  }, []);

  const getTypes = () => {
    const arr = [];
    allIngridients.forEach((el) => {
      if (!arr.includes(el.type)) {
        arr.push(el.type);
      }
    });

    setTypes(arr);
  };

  return (
    <section className={'mr-10 pt-10 ' + styles.BurgerIngredients}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={'mt-10 ' + styles.ingredientsContainer}>
        {types.map((el, index) => {
          const ingredientsOneType = allIngridients.filter((data) => data.type === el);

          return (
            <li key={index}>
              <h2 className="text text_type_main-medium">{basicTypes[el]}</h2>
              <div className={'pt-6 pr-2 pb-10 pl-4 ' + styles.ingredientsGroup}>
                {ingredientsOneType.map((el, i) => {
                  let count = undefined;
                  if (i === 0) count = 1;

                  return (
                    <IngridientsElement
                      name={el.name}
                      price={el.price}
                      image={el.image}
                      count={count}
                    />
                  );
                })}
              </div>
            </li>
          );
        })}
      </div>
    </section>
  );
};

export default BurgerIngredients;
