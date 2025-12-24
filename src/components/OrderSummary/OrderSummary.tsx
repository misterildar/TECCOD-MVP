import React from "react";
import type { OrderSummaryProps } from "./types";
import styles from "./OrderSummary.module.scss";

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedServices,
  total,
  onCheckout,
}) => {
  return (
    <div className={styles.orderSummary}>
      <h3 className={styles.orderSummaryHeading}>Итого</h3>

      <div className={styles.orderSummaryList}>
        {selectedServices.length === 0 ? (
          <p className={styles.orderSummaryEmpty}>Нет выбранных услуг</p>
        ) : (
          selectedServices.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              className={styles.orderSummaryItem}
            >
              <span>{service.title}</span>
              <span>{service.price.toLocaleString("ru-RU")} ₽</span>
            </div>
          ))
        )}
      </div>

      <div className={styles.orderSummaryDivider} />

      <div className={styles.orderSummaryTotalRow}>
        <span>Общая сумма:</span>
        <span className={styles.orderSummaryTotalPrice}>
          {total.toLocaleString("ru-RU")} ₽
        </span>
      </div>

      <button
        onClick={onCheckout}
        disabled={selectedServices.length === 0}
        className={styles.orderSummaryButton}
      >
        Оформить заказ
      </button>
    </div>
  );
};
