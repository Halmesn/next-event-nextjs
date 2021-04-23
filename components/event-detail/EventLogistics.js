import AddressIcon from 'components/icons/AddressIcon';
import DateIcon from 'components/icons/DateIcon';
import LogisticsItem from './LogisticsItem';
import styles from './EventLogistics.module.css';

function EventLogistics({ event }) {
  const { date, location, image, title } = event;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedAddress = location.replace(', ', '\n');

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <img src={image} alt={title} />
      </div>
      <ul className={styles.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{formattedDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{formattedAddress}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
