import React, { useRef } from "react";
import styles from "./Carousel.module.css";
import useIsDesktop from "../hooks/useIsDesktop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import withDebounce from "../utils/withDebounce";
import Image from "../utils/types/Image";
import { CallbackFunction } from "../utils/types/CallbackFunction";

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

const CarouselImage: React.FC<{
  image: Image;
  callback?: CallbackFunction<void>;
}> = ({ image, callback }) => {
  const isDesktop = useIsDesktop();

  return (
    <div className={styles.item} onClick={() => callback && callback()}>
      <img src={image.src} alt={image.alt} />
    </div>
  );
};

interface CarouselProps {
  images: Array<Image>;
  imageClickCallback?: CallbackFunction<void>;
}

const Carousel: React.FC<CarouselProps> = ({
  images = [],
  imageClickCallback,
}) => {
  const isDesktop = useIsDesktop();
  const container = useRef<HTMLDivElement>(null);

  const scroll = (direction: Direction) => {
    if (!container.current) {
      return;
    }

    if (direction === "right") {
      container.current!.scrollLeft += 800;
    } else {
      container.current!.scrollLeft -= 800;
    }
  };

  const debouncedScrollLeft = withDebounce(() => scroll("left"), 350);
  const debouncedScrollRight = withDebounce(() => scroll("right"), 350);

  return (
    <>
      <div
        className={[styles.container, styles.noScrollbar].join(" ")}
        ref={container}
      >
        {isDesktop && <Arrow direction="left" onClick={debouncedScrollLeft} />}
        {isDesktop && (
          <Arrow direction="right" onClick={debouncedScrollRight} />
        )}
        {images &&
          images.map((image: Image, index: number) => (
            <CarouselImage
              key={index}
              image={image}
              callback={() => imageClickCallback && imageClickCallback(index)}
            />
          ))}
      </div>
    </>
  );
};

export default Carousel;
