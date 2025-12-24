import { type FC } from 'react';
import styles from './PageHeader.module.scss';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader: FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className={styles.pageHeader}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
};
