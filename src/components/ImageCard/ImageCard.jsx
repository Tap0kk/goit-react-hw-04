import s from './ImageCard.module.css';

const ImageCard = ({ src, alt, onClick }) => {
  return (
    <div className={s.card}>
      <img className={s.image} onClick={onClick} src={src} alt={alt} />
    </div>
  );
};

export default ImageCard;
