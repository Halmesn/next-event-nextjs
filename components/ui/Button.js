import Link from 'next/link';
import styles from './Button.module.css';

export default function Button({ href, children, onClick }) {
  return href ? (
    <Link href={href}>
      <a className={styles.btn}>{children}</a>
    </Link>
  ) : (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
}
