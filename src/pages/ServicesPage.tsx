import React, { useState, useCallback } from "react";
import { services } from "../mock/services";
import { ServiceCard } from "../components/ServiceCard";
export interface Service {
  id: string;
  title: string;
  price: number;
}

export type CartItem = Service;
import { OrderSummary } from "../components/OrderSummary";
import { Modal } from "../components/Modal";
import styles from "./ServicesPage.module.scss";

export const ServicesPage: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddService = useCallback((service: Service) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.id === service.id);
      if (exists) return prev;
      return [...prev, service];
    });
  }, []);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedServices([]);
  };

  const totalPrice = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0
  );

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
              isSelected={selectedServices.some((s) => s.id === service.id)}
            />
          ))}
        </div>

        <div className={styles.servicesPageSidebar}>
          <OrderSummary
            selectedServices={selectedServices}
            total={totalPrice}
            onCheckout={handleCheckout}
          />
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
