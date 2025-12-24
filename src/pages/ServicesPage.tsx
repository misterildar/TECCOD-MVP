import React, { useState, useCallback, useMemo } from "react";
import { useCartStore, useCartTotal } from "../entities/cart/model/cartStore";
import { services } from "../shared/mock/services";
import { ServiceCard } from "../entities/service/ui/ServiceCard";
export interface Service {
  id: string;
  title: string;
  price: number;
}

export type CartItem = Service;
import { OrderSummary } from "../widgets/OrderSummary";
import { Modal } from "../shared/ui/Modal";
import styles from "./ServicesPage.module.scss";

export const ServicesPage: React.FC = () => {
  const selectedIds = useCartStore((state) => state.selectedIds);
  const addItem = useCartStore((state) => state.addItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartTotal();

  const selectedServiceIds = useMemo(() => new Set(selectedIds), [selectedIds]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddService = useCallback(
    (service: Service) => {
      addItem(service.id);
    },
    [addItem]
  );

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearCart();
  };

  return (
    <div className={styles.servicesPage}>
      <header className={styles.servicesPageHeader}>
        <h1 className={styles.servicesPageTitle}>Дополнительные услуги</h1>
        <p className={styles.servicesPageSubtitle}>
          Выберите услуги для вашего полета
        </p>
      </header>

      <div className={styles.servicesPageContent}>
        <div className={styles.servicesPageServicesGrid}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onAdd={handleAddService}
              isSelected={selectedServiceIds.has(service.id)}
            />
          ))}
        </div>

        <div className={styles.servicesPageSidebar}>
          <OrderSummary onCheckout={handleCheckout} />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Заказ оформлен!"
      >
        <p>Ваши услуги успешно добавлены к заказу.</p>
        <p>
          Итоговая сумма: <b>{totalPrice.toLocaleString("ru-RU")} ₽</b>
        </p>
      </Modal>
    </div>
  );
};
