import React from "react";
import styles from "./Introduction.module.css";

interface Props {
  title: string;
  leftText: string;
  rightText: string;
}

const Introduction: React.FC<Props> = ({ title, leftText, rightText }) => {
  return (
    <>
      <div className={[styles.colContainer, styles.content].join(" ")}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.rowContainer}>
          <div>
            {leftText.split("\n").map((item, idx) => (
              <p className={styles.paragraph} key={idx}>
                {item}
              </p>
            ))}
          </div>
          <div>
            {leftText.split("\n").map((item, idx) => (
              <p className={styles.paragraph} key={idx}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Introduction;
