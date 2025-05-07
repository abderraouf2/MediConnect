import React from "react";
import styles from "./loader.module.css";
export default function PageLoader() {
  return (
    <div className={styles.threeBody}>
      <div className={styles.threeBody__dot}></div>
      <div className={styles.threeBody__dot}></div>
      <div className={styles.threeBody__dot}></div>
    </div>
  );
}
