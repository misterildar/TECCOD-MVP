import React from "react";
import {
  useCartStore,
  useCartServices,
  useCartTotal,
} from "../../entities/cart/model/cartStore";
import type { OrderSummaryProps } from "./types";
import styles from "./OrderSummary.module.scss";

export const OrderSummary: React.FC<OrderSummaryProps> = ({ onCheckout }) => {
  const selectedServices = useCartServices();
  const total = useCartTotal();
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div className={styles.orderSummary}>
      <div className={styles.orderSummaryHeader}>
        <h3 className={styles.orderSummaryHeading}>Итого</h3>
        {selectedServices.length > 0 && (
          <button className={styles.orderSummaryClear} onClick={clearCart}>
            Очистить
          </button>
        )}
      </div>

      <div className={styles.orderSummaryList}>
        {selectedServices.length === 0 ? (
          <p className={styles.orderSummaryEmpty}>Нет выбранных услуг</p>
        ) : (
          selectedServices.map((service) => (
            <div key={`${service.id}`} className={styles.orderSummaryItem}>
              <div className={styles.orderSummaryItemInfo}>
                <span className={styles.orderSummaryItemTitle}>
                  {service.title}
                </span>
                <span className={styles.orderSummaryItemPrice}>
                  {service.price.toLocaleString("ru-RU")} ₽
                </span>
              </div>
              <button
                className={styles.orderSummaryItemRemove}
                onClick={() => removeItem(service.id)}
                aria-label="Удалить услугу"
              >
                &times;
              </button>
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
