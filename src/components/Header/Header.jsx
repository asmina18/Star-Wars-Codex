import styles from './Header.module.scss';
import starWarsImg from '../../assets/images/star-wars.jpg';

export const Header = () => {
  return (
    <div className={styles.header}>
      <img src={starWarsImg} alt="Star Wars"
       className={styles.headerImage} />
      <h1 className={styles.title}>Star Wars </h1>
    </div>
  );
};
