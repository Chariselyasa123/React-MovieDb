import React, { useEffect, useState, useRef  } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import { Typography, Row, Carousel, Input, Card } from 'antd'
import Mainimage from './Section/Mainimage'
import GridCard from './Section/GridCard'
import styles from './Section/mainImage.module.css'
import LoadingPage from '../LoadingPage'
import SearchFilm from './Section/SearchFilm';

const { Title } = Typography

function LandingPage() {
    const buttonRef = useRef(null);

    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)
    const [Trending, setTrending] = useState(null)
    const [TopRated, setTopRated] = useState([])
    const [Loading, setLoading] = useState(true)

    const settings = {
        dots: false,
        slidesToShow: 4,
        arrows: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        
    };
    
    useEffect(() => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endPoint)

        fetch(`${API_URL}trending/all/week?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(response => {
                // console.log(response.results)
                setTrending(response.results)
                setLoading(false)
            })
        
        fetch(`${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
            .then(response => response.json())
            .then(response => {
                // console.log(response.results)
                setTopRated([...TopRated, ...response.results])
                setLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])

    const fetchMovies = (path) => {
        fetch(path)
            .then(response=>response.json())
            .then(response=>{
                // console.log(response)
                setMovies([...Movies, ...response.results])
                setCurrentPage(response.page)
                
            })
            .catch(error => console.error('Error:', error))
    }

    const handleClick = () => {
        let endPoint = '';
        setLoading(false)
        endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`
        fetchMovies(endPoint)
    }

    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 1) {

            // loadMoreItems()
            // console.log('clicked')
            buttonRef.current.click();

        }
    }


    return (
        <div style={{ width:'100%', margin: 0 }}>
            {Loading ?

            <LoadingPage />
            
            :

            
            <>
            <Carousel autoplay>
                {Trending && Trending.map((trend, index) => (
                 <div>
                     <div style={{ height: '500px' }}>
                         <a href={`/movie/${trend.id}`} className={styles.mainImage}>
                             <Mainimage 
                                 image={`${IMAGE_URL}w1280${trend.backdrop_path && trend.backdrop_path}`} 
                                 title={trend.original_title|| trend.original_name}
                                 text={trend.overview}
                                 rating={trend.vote_average}
                                 />
                         </a>
                     </div>
                 </div>
                ))}
            </Carousel>
                
            <div style={{ width: '85%', margin: '1rem auto' }}>

                {/* bagian Pencarian */}
                <SearchFilm/>

                {/* Movie by TOP RATED */}
                <Title level={2}> Top Rated </Title>
                <hr/>
                <Card style={{ backgroundColor: '#f5f3f0' }}>
                    <Carousel {...settings} autoplay>
                    {/* <Row gutter={[16,16]}> */}
                        {TopRated && TopRated.map((topRated, index) => (
                            <React.Fragment key={index}>
                                <GridCard
                                    topRated
                                    image={topRated.poster_path && `${IMAGE_URL}w500${topRated.poster_path}`}
                                    movieId={topRated.id}
                                    title={topRated.title}
                                    rating={topRated.vote_average}
                                />
                            </React.Fragment>
                        ))}
                    {/* </Row> */}
                    </Carousel>
                </Card>

                {/* Movie by lastets */}
                <Title level={2}> Movie by lastets</Title>
                <hr/>

                
                <Row gutter={[16,16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                                movieId={movie.id}
                                title={movie.title}
                                rating={movie.vote_average}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                

                
                <br/>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button ref={buttonRef} className="loadMore" onClick={handleClick}>Load More</button>
                </div>
            </div>
            </>
            }
            
        </div>
            
            
            
    )
}

export default LandingPage
