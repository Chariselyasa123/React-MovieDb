import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import { Typography, Row, Carousel  } from 'antd'
import Mainimage from './Section/Mainimage'
import GridCard from './Section/GridCard'

const { Title } = Typography

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)
    const [Trending, setTrending] = useState([])

    useEffect(() => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endPoint)

        fetch(`${API_URL}trending/all/week?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(response => {
                console.log(response.results)
                setTrending(response.results)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchMovies = (path) => {
        fetch(path)
            .then(response=>response.json())
            .then(response=>{
                // console.log(response)
                setMovies([...Movies, ...response.results])
                setCurrentPage(response.page)
            })
    }

    const handleClick = () => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`
        fetchMovies(endPoint)
    }

    return (
        <div style={{ width:'100%', margin: 0 }}>

            {/* Gambar depan film */}
            <Carousel autoplay>
                <div>
                    <div style={{ height: '500px' }}>
                        {Trending[0] && 
                            <Mainimage 
                                image={`${IMAGE_URL}w1280${Trending[0].backdrop_path && Trending[0].backdrop_path}`} 
                                title={Trending[0].original_title|| Trending[0].original_name}
                                text={Trending[0].overview}
                                rating={Trending[0].vote_average}
                            />
                        }
                    </div>
                </div>
                <div>
                    <div style={{ height: '500px' }}>
                        {Trending[1] && 
                            <Mainimage 
                                image={`${IMAGE_URL}w1280${Trending[1].backdrop_path && Trending[1].backdrop_path}`} 
                                title={Trending[1].original_title|| Trending[1].original_name}
                                text={Trending[1].overview}
                                rating={Trending[1].vote_average}
                            />
                        }
                    </div>
                </div>
                <div>
                    <div style={{ height: '500px' }}>
                        {Trending[2] && 
                            <Mainimage 
                                image={`${IMAGE_URL}w1280${Trending[2].backdrop_path && Trending[2].backdrop_path}`} 
                                title={Trending[2].original_title|| Trending[2].original_name}
                                text={Trending[2].overview}
                                rating={Trending[2].vote_average}
                            />
                        }
                    </div>
                </div>
                <div>
                    <div style={{ height: '500px' }}>
                        {Trending[3] && 
                            <Mainimage 
                                image={`${IMAGE_URL}w1280${Trending[3].backdrop_path && Trending[3].backdrop_path}`} 
                                title={Trending[3].original_title || Trending[3].original_name}
                                text={Trending[3].overview}
                                rating={Trending[3].vote_average}
                            />
                        }
                    </div>
                </div>
            </Carousel>
            
            
            {/* BODY */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <Title level={2}> Movie by lastets</Title>
                <hr/>

                {/* Grid Card */}
                <Row gutter={[16,16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                                movieId={movie.id}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                {/* Menampilkan More Button */}
                <br/>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={handleClick}>Load More</button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
