import React from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
  return (
    <>
      <div className={[styles.colContainer, styles.footer].join(" ")}>
        <h1>Contact</h1>
        <div className={styles.rowContainer}>
          <FontAwesomeIcon style={{ fontSize: "2em" }} icon={faPhone} />
          <FontAwesomeIcon style={{ fontSize: "2em" }} icon={faInstagram} />
          <FontAwesomeIcon style={{ fontSize: "2em" }} icon={faFacebook} />
        </div>
      </div>
    </>
  );
};

export default Footer;
