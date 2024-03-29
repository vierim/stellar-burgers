import { useCallback } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useDrop } from 'react-dnd';

import { TFindCard, TMoveCard } from '../../types';

import {
  removeItemAction,
  moveItemAction,
} from '../../services/actions/burger-constructor';

import DndElement from '../dnd-element';

import styles from './drag-and-drop.module.css';

const DragAndDrop: React.FC = () => {
  const dispatch = useDispatch();

  const ingredients = useSelector((store) => store.ingredients.data);
  const { items } = useSelector((store) => store.construct);

  const handleDelete = (uid: string) => dispatch(removeItemAction(uid));

  const findCard: TFindCard = useCallback(
    (id) => {
      const searchItem = items.filter((item) => item.uid === id)[0];
      const searchItemIndex = items.indexOf(searchItem);

      return {
        searchItem,
        index: searchItemIndex,
      };
    },
    [items]
  );

  const moveCard: TMoveCard = useCallback(
    (draggedId, overIndex) => {
      const { index } = findCard(draggedId);

      const newSortItems = items.slice();
      newSortItems.splice(index, 1);
      newSortItems.splice(overIndex, 0, items[index]);

      dispatch(moveItemAction(newSortItems));
    },
    [findCard, items, dispatch]
  );

  const [, drop] = useDrop(() => ({ accept: 'currentBurger' }));

  return (
    <div className={styles.container} ref={drop}>
      {items.map((item) => {
        const currentIngredient = ingredients.find((el) => el._id === item.id);

        if (currentIngredient) {
          const { name, price, image } = currentIngredient;

          return (
            <DndElement
              key={item.uid}
              uid={item.uid}
              name={name}
              price={price}
              image={image}
              findCard={findCard}
              moveCard={moveCard}
              onDelete={handleDelete}
            />
          );
        } else {
          return undefined;
        }
      })}
    </div>
  );
};

export default DragAndDrop;
