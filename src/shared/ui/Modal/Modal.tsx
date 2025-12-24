import React from "react";
import type { ModalProps } from "./types";
import styles from "./Modal.module.scss";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleCancel = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onClose();
  };

  return (
    <dialog ref={dialogRef} className={styles.modal} onCancel={handleCancel}>
      <div className={styles.modalHeader}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <button className={styles.modalCloseButton} onClick={onClose}>
          &times;
        </button>
      </div>
      <div className={styles.modalContent}>{children}</div>
      <div className={styles.modalFooter}>
        <button className={styles.modalOkButton} onClick={onClose}>
          Хорошо
        </button>
      </div>
    </dialog>
  );
};
