import { type FC } from 'react';
import type { ServiceCardProps } from './types';

import styles from './ServiceCard.module.scss';

export const ServiceCard: FC<ServiceCardProps> = ({ service, onAdd, isSelected }) => {
  return (
    <article className={styles.serviceCard}>
      <h3 className={styles.serviceCardTitle}>{service.title}</h3>
      <p className={styles.serviceCardPrice}>{service.price.toLocaleString('ru-RU')} ₽</p>
      <button
        onClick={() => onAdd(service)}
        disabled={isSelected}
        className={styles.serviceCardButton}
      >
        {isSelected ? 'Добавлено' : 'Добавить'}
      </button>
    </article>
  );
};
