import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import s from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ image, isOpen, onClose }) => {
  if (!image) return null;

  const { urls, alt_description, user, likes } = image;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <div className={s.content}>
        <img
          src={urls.regular}
          alt={alt_description || 'Image'}
          className={s.image}
        />
        <div className={s.info}>
          <p>
            <strong>Author:</strong> <span>{user.name}</span>
          </p>
          <p>
            <strong>Likes:</strong> <span>{likes}</span>
          </p>
          <p>
            <strong>Description:</strong>{' '}
            <span>{alt_description || 'No description available'}</span>
          </p>
        </div>
        <button className={s.closeButton} onClick={onClose}>
          <FaTimes size={24} />
        </button>
      </div>
    </Modal>
  );
};

export default ImageModal;
