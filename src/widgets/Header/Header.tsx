import { type FC } from "react";
import styles from "./Header.module.scss";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Дополнительные услуги</h1>
      <p className={styles.subtitle}>Выберите услуги для вашего полета</p>
    </header>
  );
};
