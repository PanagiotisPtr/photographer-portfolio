import MainMenu from "../components/MainMenu";
import Carousel from "../components/Carousel";
import ImageViewer from "../components/ImageViewer";

const Home = () => {
  return (
    <div>
      <ImageViewer images={[]} show={true} />
      <MainMenu />
      <Carousel images={[]} />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
