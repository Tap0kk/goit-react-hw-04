import s from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return <div className={s.error}>{message}</div>;
};

export default ErrorMessage;
