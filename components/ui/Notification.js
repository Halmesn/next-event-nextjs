import { GlobalContext } from 'store/GlobalContext';
import { useContext } from 'react';

import styles from './Notification.module.css';

function Notification() {
  const { notification, hideNotification } = useContext(GlobalContext);
  const { title, message, status } = notification;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = styles.success;
  }

  if (status === 'error') {
    statusClasses = styles.error;
  }

  if (status === 'pending') {
    statusClasses = styles.pending;
  }

  const activeClasses = `${styles.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
