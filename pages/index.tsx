import MainMenu from '../components/MainMenu'
import Carousel from '../components/Carousel'

const Home = () => {
  return (
    <div>
      <MainMenu />
      <Carousel images={[]} />
      <h1>Home</h1>
    </div>
  )
}

export default Home