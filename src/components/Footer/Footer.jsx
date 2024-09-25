import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>
          Crafted by <strong>Amina</strong>, <strong>Makka</strong>
        </p>
        <p>
          <a href="#">Terms & Conditions</a> | <a href="#">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

