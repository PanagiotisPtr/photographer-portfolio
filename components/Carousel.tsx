import React, { useRef } from 'react';
import styles from './Carousel.module.css';
import useIsDesktop from '../hooks/useIsDesktop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import withDebounce from '../utils/withDebounce';

interface Image {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: Array<Image>;
}

interface ClickHandler {
  (): void;
}

type Direction = 'right' | 'left';

interface ArrowProps {
  direction: Direction;
  onClick?: ClickHandler;
}

const Arrow: React.FC<ArrowProps> = ({ direction, onClick = () => {} }) => {
  return (
    <div className={[
        styles.arrow,
        (direction === 'right' ? styles.rightArrow : styles.leftArrow)
      ].join(' ')}>
      <FontAwesomeIcon
        icon={direction === 'right' ? faChevronRight : faChevronLeft}
        onClick={onClick}
      />
    </div>
  );
}

const CarouselImage: React.FC<Image> = ({ src, alt }) => {
  const isDesktop = useIsDesktop();

  return (
    <div className={styles.item}>
      <img
        src={src}
        alt={alt}
      />
    </div>
  );
}

const Carousel: React.FC<CarouselProps> = ({
  images = []
}) => {
  const isDesktop = useIsDesktop();
  const container = useRef<HTMLDivElement>(null);

  const scroll = (direction: Direction) => {
    if (container.current === null) {
      return;
    }

    if (direction === 'right') {
      container.current!.scrollLeft += 800;
    } else {
      container.current!.scrollLeft -= 800;
    }
  }

  const debouncedScrollLeft = withDebounce(() => scroll('left'), 350);
  const debouncedScrollRight = withDebounce(() => scroll('right'), 350);
  
  return (
    <>
      <div className={[styles.container, styles.noScrollbar].join(' ')} ref={container}>
        {isDesktop && <Arrow direction='left' onClick={debouncedScrollLeft}/> }
        {isDesktop &&  <Arrow direction='right' onClick={debouncedScrollRight}/> }
        <CarouselImage src="https://cdn.pixabay.com/photo/2021/07/29/20/23/mountains-6508015_960_720.jpg" alt="picture of trees"/>
        <CarouselImage src="https://cdn.pixabay.com/photo/2021/07/30/20/28/montmartre-6510653_960_720.jpg" alt="picture of trees"/>
        <CarouselImage src="https://cdn.pixabay.com/photo/2021/06/27/14/32/raspberry-6368999_960_720.png" alt="picture of trees"/>
        <CarouselImage src="https://cdn.pixabay.com/photo/2019/06/22/18/31/love-4292211_960_720.jpg" alt="picture of trees"/>
        <CarouselImage src="https://cdn.pixabay.com/photo/2021/01/29/08/10/musician-5960112_960_720.jpg" alt="picture of trees"/>
      </div>
    </>
  );
};

export default Carousel;
