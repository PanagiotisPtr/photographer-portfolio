import React from 'react';
import styles from './Carousel.module.css';
import Image from 'next/image'

interface Image {
  url: string;
  thumbnail?: string;
  blur?: string;
  alt: string;
}

interface CarouselProps {
  images: Array<Image>;
}

const CarouselImage: React.FC = () => {
  return (
    <div className={styles.item}>
      <Image
        src="https://cdn.pixabay.com/photo/2021/07/29/20/23/mountains-6508015_960_720.jpg"
        alt="Picture of trees"
        width={1920}
        height={1080}
      />
    </div>
  );
}

const Carousel: React.FC<CarouselProps> = ({
  images = []
}) => {
  return (
    <>
      <div className={[styles.hs, styles.full, styles.noScrollbar].join(' ')}>
        <CarouselImage />
        <CarouselImage />
        <CarouselImage />
        <CarouselImage />
        <CarouselImage />
        <CarouselImage />
        <CarouselImage />
        <CarouselImage />
        <CarouselImage />
      </div>
          </>
  );
};

export default Carousel;
