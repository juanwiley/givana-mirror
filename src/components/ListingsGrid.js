import styles from './ListingsGrid.module.css';

export default function ListingsGrid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}
