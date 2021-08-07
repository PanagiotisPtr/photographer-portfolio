import styles from "./ImageViewer.module.css";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Image from "../utils/types/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { CallbackFunction } from "../utils/types/CallbackFunction";
import withDebounce from "../utils/withDebounce";
import useKeyEvents from "../hooks/useKeyEvents";

const DisplayImage: React.FC<Image> = ({ src, alt }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <>
      <img
        className={[styles.image, styles.selectDisable].join(" ")}
        src={src}
        alt={alt}
        ref={imageRef}
      />
    </>
  );
};

type Direction = "right" | "left";

interface ArrowProps {
  direction: Direction;
  onClick?: CallbackFunction<void>;
}

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

interface ImageViewerProps {
  show: boolean;
  selected?: number;
  images: Array<Image>;
  closeImageViewerCallback?: CallbackFunction<void>;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  show,
  selected,
  images,
  closeImageViewerCallback,
}) => {
  const [active, setActive] = useState<number>(selected ? selected : 0);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const colContainerRef = useRef<HTMLDivElement>(null);
  const rowContainerRef = useRef<HTMLDivElement>(null);

  const handlePrev: CallbackFunction<void | null> = withDebounce(() => {
    setActive(Math.max(0, active - 1));
  }, 350);

  const handleNext: CallbackFunction<void | null> = withDebounce(() => {
    setActive(Math.min(images.length - 1, active + 1));
  }, 350);

  const leftArrowPressed = useKeyEvents("ArrowLeft");
  const rightArrowPressed = useKeyEvents("ArrowRight");

  useEffect(() => {
    if (leftArrowPressed) {
      handlePrev();
    }
    if (rightArrowPressed) {
      handleNext();
    }
  }, [leftArrowPressed, rightArrowPressed]);

  return (
    <>
      <div
        className={[styles.imageViewer, show ? styles.show : styles.hide].join(
          " "
        )}
        ref={backgroundRef}
        onClick={(e) => {
          if (
            e.target !== backgroundRef.current &&
            e.target !== colContainerRef.current &&
            e.target !== rowContainerRef.current
          ) {
            return;
          }

          closeImageViewerCallback && closeImageViewerCallback();
        }}
      >
        <Arrow direction="left" onClick={handlePrev} />
        <Arrow direction="right" onClick={handleNext} />
        <div
          className={[
            styles.fullWidth,
            styles.fullHeight,
            styles.rowContainer,
          ].join(" ")}
          ref={rowContainerRef}
        >
          <div
            className={[styles.fullHegiht, styles.colContainer].join(" ")}
            ref={colContainerRef}
          >
            <DisplayImage src={images[active].src} alt={images[active].alt} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageViewer;
