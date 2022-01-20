import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from '../header-button/header-button';
import styles from './app-header.module.css';

const AppHeader = () => {

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.navigation}>
          <ul className={styles.list}>
            <li>
              <HeaderButton name="Конструктор">
                <BurgerIcon type="primary" />
              </HeaderButton>
            </li>
            <li className="ml-2">
              <HeaderButton name="Лента заказов" inactive>
                <ListIcon type="secondary" />
              </HeaderButton>
            </li>
          </ul>
        </nav>
        <Logo />
        <div className={styles.rightSide}>
          <HeaderButton name="Личный кабинет" inactive>
            <ProfileIcon type="secondary" />
          </HeaderButton>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
