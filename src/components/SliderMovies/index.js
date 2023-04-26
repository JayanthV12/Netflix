import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SliderMovies = props => {
  const {movies} = props
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <Slider {...settings}>
      {movies.map(each => {
        const {id, backdropPath} = each
        return (
          <div className="slick-container">
            <div className="slick-item" key={id}>
              <Link to={`/movies/${id}`}>
                <img className="movie-item" src={backdropPath} alt="title" />
              </Link>
            </div>
          </div>
        )
      })}
    </Slider>
  )
}

export default SliderMovies
