import styles from "./ImageViewer.module.css";
import React from "react";
import Image from "../utils/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import withDebounce, { CallbackFunction } from "../utils/withDebounce";

interface Props {
  show: boolean;
  selected?: number;
  images: Array<Image>;
}

const DisplayImage: React.FC<Image> = ({ src, alt }) => {
  return (
    <>
      <img className={styles.image} src={src} alt={alt} />
    </>
  );
};

interface ClickHandler {
  (): void;
}

type Direction = "right" | "left";

interface ArrowProps {
  direction: Direction;
  onClick?: ClickHandler;
}

// @todo those arrows are a bit broken (need to investigate)
const Arrow: React.FC<ArrowProps> = ({ direction, onClick = () => {} }) => {
  return (
    <div
      className={[
        styles.arrow,
        direction === "right" ? styles.rightArrow : styles.leftArrow,
      ].join(" ")}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={direction === "right" ? faChevronRight : faChevronLeft}
      />
    </div>
  );
};

const ImageViewer: React.FC<Props> = ({ show, selected, images }) => {
  const handlePrev: CallbackFunction<void | null> = withDebounce(() => {
    console.log("hello");
  }, 300);

  const handleNext: CallbackFunction<void | null> = withDebounce(() => {
    console.log("world");
  }, 300);

  return (
    <>
      <div
        className={[styles.imageViewer, show ? styles.show : styles.hide].join(
          " "
        )}
      >
        <Arrow direction="left" onClick={handlePrev} />
        <Arrow direction="right" onClick={handleNext} />
        <div
          className={[
            styles.fullWidth,
            styles.fullHeight,
            styles.rowContainer,
          ].join(" ")}
        >
          <div className={[styles.fullHegiht, styles.colContainer].join(" ")}>
            <DisplayImage
              src="https://cdn.pixabay.com/photo/2021/07/29/20/23/mountains-6508015_960_720.jpg"
              alt="trees"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageViewer;
