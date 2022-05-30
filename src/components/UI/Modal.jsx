import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';

const modalRoot = document.getElementById('modal');

const Backdrop = ({ onCartClosed }) => {
  return <div className={styles.backdrop} onClick={onCartClosed}></div>;
};

const ModalContent = ({ children }) => {
  return <div className={styles['modal-content']}>{children}</div>;
};

export const Modal = ({ children, onBackdropClicked }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCartClosed={onBackdropClicked} />,
        modalRoot
      )}
      {ReactDOM.createPortal(
        <ModalContent>{children}</ModalContent>,
        modalRoot
      )}
    </>
  );
};
