import styles from './EventItem.module.css';
import Button from 'components/ui/Button';
import DateIcon from 'components/icons/DateIcon';
import AddressIcon from 'components/icons/AddressIcon';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';

export default function EventItem({ events }) {
  const renderedList = events.map((event) => {
    const { image, title, location, date, id } = event;
    const formattedDate = new Date(date).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const formattedAddress = location.replace(', ', '\n');

    return (
      <li key={id} className={styles.item}>
        <img src={image} alt={title} />
        <div className={styles.content}>
          <div className={styles.summary}>
            <h2>{title}</h2>
            <div>
              <time className={styles.date}>
                <DateIcon />
                {formattedDate}
              </time>
            </div>
            <address className={styles.address}>
              <AddressIcon />
              {formattedAddress}
            </address>
          </div>
          <div className={styles.actions}>
            <Button href={`/events/${id}`}>
              <span>Explore Event</span>
              <span className={styles.icon}>
                <ArrowRightIcon />
              </span>
            </Button>
          </div>
        </div>
      </li>
    );
  });

  return <>{renderedList}</>;
}
