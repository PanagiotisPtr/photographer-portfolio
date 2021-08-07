import MainMenu from "../components/MainMenu";
import Carousel from "../components/Carousel";
import ImageViewer from "../components/ImageViewer";
import Image from "../utils/types/Image";
import { useEffect, useState } from "react";
import useKeyEvents from "../hooks/useKeyEvents";

const Home = () => {
  const [showImages, setShowImages] = useState<boolean>(false);
  const [imageViewerIsAttached, setImageViewerIsAttached] =
    useState<boolean>(false);
  const [selectedImages, setSelectedImage] = useState<number>(0);
  const escapeKeyPressed = useKeyEvents("Escape");

  const disableArrowScrollHandler = (e: globalThis.KeyboardEvent) => {
    if (["ArrowLeft", "ArrowRight"].indexOf(e.key) > -1) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", disableArrowScrollHandler, false);

    return () =>
      window.removeEventListener("keydown", disableArrowScrollHandler);
  }, []);

  const images: Array<Image> = [
    {
      src: "https://cdn.pixabay.com/photo/2021/07/29/20/23/mountains-6508015_960_720.jpg",
      alt: "some trees",
    },
    {
      src: "https://cdn.pixabay.com/photo/2021/07/30/20/28/montmartre-6510653_960_720.jpg",
      alt: "some trees",
    },
    {
      src: "https://cdn.pixabay.com/photo/2021/06/27/14/32/raspberry-6368999_960_720.png",
      alt: "some trees",
    },
    {
      src: "https://cdn.pixabay.com/photo/2019/06/22/18/31/love-4292211_960_720.jpg",
      alt: "some trees",
    },
    {
      src: "https://cdn.pixabay.com/photo/2021/01/29/08/10/musician-5960112_960_720.jpg",
      alt: "some trees",
    },
  ];

  const closeImageViewer = () => {
    if (!showImages) {
      return;
    }
    setShowImages(false);
    setTimeout(() => setImageViewerIsAttached(false), 500);
  };

  const openImageViewer = (imageIndex: number) => {
    if (showImages) {
      return;
    }

    setSelectedImage(imageIndex);
    setImageViewerIsAttached(true);
    setShowImages(true);
  };

  useEffect(() => {
    if (escapeKeyPressed) {
      closeImageViewer();
    }
  }, [escapeKeyPressed]);

  return (
    <div>
      {imageViewerIsAttached && (
        <ImageViewer
          selected={selectedImages}
          images={images}
          show={showImages}
          closeImageViewerCallback={closeImageViewer}
        />
      )}
      <MainMenu />
      <Carousel images={images} imageClickCallback={openImageViewer} />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
