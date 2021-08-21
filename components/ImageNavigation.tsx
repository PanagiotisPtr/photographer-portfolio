import React from "react";
import Link from "next/link";
import styles from "./ImageNavigation.module.css";

interface NavigationImageProps {
  src: string;
  label: string;
  link: string;
}

interface Props {
  navigationImages: Array<NavigationImageProps>;
}

const NavigationImage: React.FC<NavigationImageProps> = ({
  src,
  label,
  link,
}) => {
  return (
    <Link href={link}>
      <a>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={src} alt={label} />
          <span className={[styles.centered, styles.imageLabel].join(" ")}>
            {label}
          </span>
        </div>
      </a>
    </Link>
  );
};

const ImageNavigation: React.FC<Props> = ({ navigationImages }) => {
  return (
    <>
      <div className={[styles.rowContainer, styles.navContainer].join(" ")}>
        {navigationImages.map((image, idx) => (
          <NavigationImage {...image} key={idx} />
        ))}
      </div>
    </>
  );
};

export default ImageNavigation;
