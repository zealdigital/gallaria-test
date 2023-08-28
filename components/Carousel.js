import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1023, min: 960 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 959, min: 0 },
    items: 1
  }
}

function CustomCarousel({ children }) {
  return (
    <Carousel
      responsive={responsive}
      showDots={true}
      ssr={true}
      autoPlay
      infinite
      autoPlaySpeed={5000}
    >
      {children}
    </Carousel>
  )
}

export default CustomCarousel
