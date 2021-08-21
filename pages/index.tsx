import MainMenu from "../components/MainMenu";
import Carousel from "../components/Carousel";
import ImageViewer from "../components/ImageViewer";
import Image from "../utils/types/Image";
import { useEffect, useState } from "react";
import useKeyEvents from "../hooks/useKeyEvents";
import Introduction from "../components/Introduction";
import ImageNavigation from "../components/ImageNavigation";
import Footer from "../components/Footer";

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

  const introTitle = "Odyssey Sapoznikov\nPhotographer";
  const leftText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus erat nibh, sed molestie lorem ornare at. Donec non est nisi. Aliquam blandit ac ex a aliquam. In et lobortis lorem. Fusce aliquam sapien vitae eleifend euismod. Nullam sapien magna, laoreet ut tristique id, laoreet vel tellus. Vestibulum eget tincidunt purus. Nam nibh leo, tristique id venenatis nec, congue sit amet ligula. Mauris interdum commodo gravida.\nNullam rhoncus sapien eu facilisis finibus. In ut eleifend quam, ut commodo ex. Vestibulum blandit convallis eros, sit amet egestas enim mollis sed. Phasellus non diam vitae sapien sollicitudin ornare id a magna. Nam pulvinar eleifend auctor. Aliquam ac varius lacus, in molestie odio. Fusce ex ex, viverra dapibus lacinia eget, pretium non urna. In porta feugiat mauris eu feugiat. Praesent sodales sem odio, in laoreet mi rhoncus condimentum. Vivamus sagittis pellentesque enim, non congue mauris.";
  const rightText = "";

  const navImages = [
    {
      src: "https://cdn.pixabay.com/photo/2021/07/30/20/28/montmartre-6510653_960_720.jpg",
      label: "Architecture",
      link: "/about",
    },
    {
      src: "https://cdn.pixabay.com/photo/2021/07/30/20/28/montmartre-6510653_960_720.jpg",
      label: "Architecture",
      link: "/about",
    },
    {
      src: "https://cdn.pixabay.com/photo/2021/07/30/20/28/montmartre-6510653_960_720.jpg",
      label: "Architecture",
      link: "/about",
    },
    {
      src: "https://cdn.pixabay.com/photo/2021/07/30/20/28/montmartre-6510653_960_720.jpg",
      label: "Architecture",
      link: "/about",
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
      <Introduction
        title={introTitle}
        leftText={leftText}
        rightText={leftText}
      />
      <ImageNavigation navigationImages={navImages} />
      <Footer />
    </div>
  );
};

export default Home;
