import { useEffect, useState } from "react";
import styles from "./BackToTop.module.scss";

export const BackToTop = () => {
  const [visible, setVisible] = useState(false); 

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={styles.backToTop}>
      {visible && ( 
        <button onClick={scrollToTop} className={styles.button}>
          Back to the Stars
        </button>
      )}
    </div>
  );
};
