import Button from 'components/ui/Button';
import styles from './ResultsTitle.module.css';

export default function ResultsTitle({ date }) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={styles.title}>
      <h1>Events in {formattedDate}</h1>
      <Button href="/events">Show all events</Button>
    </section>
  );
}
