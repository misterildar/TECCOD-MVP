import { type FC, useState, useCallback } from "react";
import { useCart } from "../entities/cart/model/cartStore";
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

export const ServicesPage: FC = () => {
  const { addItem, clearCart, totalPrice, isSelected } = useCart();

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
    <section className={styles.servicesPage}>
      <div className={styles.servicesPageContent}>
        <div className={styles.servicesPageServicesGrid}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onAdd={handleAddService}
              isSelected={isSelected(service.id)}
            />
          ))}
        </div>

        <aside className={styles.servicesPageSidebar}>
          <OrderSummary onCheckout={handleCheckout} />
        </aside>
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
    </section>
  );
};
