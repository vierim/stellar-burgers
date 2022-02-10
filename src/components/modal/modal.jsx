import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const Modal = (props) => {

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  });

  const handleKeyDown = e => {
    if(e.code === "Escape") props.closeModal();
  }

  return ReactDOM.createPortal(
    (
    <div className={styles.modal}>
      <ModalOverlay closeModal={props.closeModal} />
      <div className={styles.container}>
          <button className={styles.closeButton} onClick={props.closeModal}></button>
          {props.children}
        </div>
    </div>
    ),
    document.getElementById('react-modals')
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func,
};

export default Modal;