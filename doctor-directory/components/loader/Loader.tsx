import React from "react";
import styles from "./loader.module.css";
export default function Loader() {
  return (
    <div>
      <svg className={styles.svg} viewBox="25 25 50 50">
        <circle className={styles.circle} r="8" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
}
