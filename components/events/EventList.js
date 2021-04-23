import styles from './EventList.module.css';

export default function EventList({ children }) {
  return <ul className={styles.list}>{children}</ul>;
}
