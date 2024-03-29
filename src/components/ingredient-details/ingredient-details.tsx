import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';

import { TIngredient } from '../../types';
import { IIngredientDetailsProps, IIngredientParams } from './interface';

import { getDataThunk } from '../../services/actions/burger-ingredients/thunks';

import styles from './ingredient-details.module.css';

const IngredientDetails: React.FC<IIngredientDetailsProps> = ({ header }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { id } = useParams<IIngredientParams>();
  const ingredients = useSelector((store) => store.ingredients.data);
  const [state, setState] = useState<TIngredient | undefined>(undefined);

  useEffect(() => {
    if (!ingredients.length && !location.state) {
      dispatch(getDataThunk());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ingredients.length !== 0) {
      const data = ingredients.find((el) => el._id === id);

      setState(data ? data : undefined);
    }
  }, [ingredients, id]);

  return (
    <>
      {state && (
        <div className={styles.container}>
          {header && (
            <h2 className="mt-30 text text_type_main-large">{header}</h2>
          )}
          <div className={styles.card}>
            <img
              className={styles.image + ' mb-4'}
              src={state.image_large}
              alt={state.name}
            />
            <h3 className={styles.name + ' mb-8 text text_type_main-medium'}>
              {state.name}
            </h3>
            <ul className={styles.list}>
              <li className={styles.item}>
                <h4 className="text text_type_main-default">Калории,ккал</h4>
                <p className="text text_type_digits-default">
                  {state.calories}
                </p>
              </li>
              <li className={styles.item}>
                <h4 className="text text_type_main-default">Белки, г</h4>
                <p className="text text_type_digits-default">
                  {state.proteins}
                </p>
              </li>
              <li className={styles.item}>
                <h4 className="text text_type_main-default">Жиры, г</h4>
                <p className="text text_type_digits-default">{state.fat}</p>
              </li>
              <li className={styles.item}>
                <h4 className="text text_type_main-default">Углеводы, г</h4>
                <p className="text text_type_digits-default">
                  {state.carbohydrates}
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default IngredientDetails;
