import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL, YOUTUBE_URL } from '../../Config'
import Mainimage from '../LandingPage/Section/Mainimage'
import { Button, Row, Col, Divider, Space } from 'antd'
import GridCard from '../LandingPage/Section/GridCard'
import Favorite from './Sections/Favorite'
import Comments from './Sections/Comments'
import Axios from 'axios'
import LikeDislike from './Sections/LikeDislike'
import MovieInfo from './Sections/MovieInfo'
import LoadingPage from '../LoadingPage'
import WatchTrailer from './Sections/WatchTrailer'
import { Redirect } from "react-router-dom";


function MovieDetailPage(p) {

    const [Movie, setMovie] = useState([])
    const [Crews, setCrews] = useState([])
    const [ActorTogle, setActorTogle] = useState(true)
    const [Text, setText] = useState("")
    const [CommentList, setCommentList] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
    const [Trailer, setTrailer] = useState([])
    const movieId = p.match.params.movieId
    const movieVariable = {
        movieId: movieId
    }


    useEffect(() => {

        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo)
        
        Axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                // console.log(response)
                if (response.data.success) {
                    // console.log('response.data.comments', response.data.comments)
                    setCommentList(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })
        handleClick()
    }, [])

    const fetchDetailInfo = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setMovie(result)
                setLoadingForMovie(false)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        // console.log(result.cast)
                        setCrews(result.cast)
                    })
                setLoadingForCasts(false)

                let endpointForTriler = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
                fetch(endpointForTriler)
                    .then(result => result.json())
                    .then(result => {
                        // const keyword = "OFFICIAL TRAILER"
                        // const filtered = result.results.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword, "Official Trailer")));
                        const triler = result.results.filter(type => type.type === "Trailer" )
                        const key = triler.map((val,index) => {
                            return(val.key);
                        })
                        setTrailer(key)
                        // console.log(key);
                        console.log(result);
                    })
            })
            .catch(error => console.error('Error:', error)
            )
    }

    const handleClick = () => {
        setActorTogle(!ActorTogle)
        if(!ActorTogle){
            setText("Hide Actor's")
        }else{
            setText("Show Actor's")
        }
    }

    const updateComment = (newComment) => {
        setCommentList(CommentList.concat(newComment))
    }


    return (
        <div>
            
            {LoadingForMovie ?

                <LoadingPage />

                :

                <React.Fragment>

                    {/* Gambar Baliho */}
                    <Mainimage 
                        image={`${IMAGE_URL}w1280${Movie.backdrop_path}`} 
                        title={Movie.original_title}
                        text={Movie.overview}
                        rating={Movie.vote_average}
                    />

                    <div style={{ width: '85%', margin: '1rem auto' }}>

                        {/* Like dislike favorite */}
                        <Row>
                            <Col span={8}> 
                            
                                <LikeDislike movie movieId={movieId} userId={localStorage.getItem('userId')} styleMovie={{ paddingRight: '1rem' }}/> 
                            
                            </Col>
                            <Col span={8} offset={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Space size="middle">
                                    <WatchTrailer link={`${YOUTUBE_URL}${Trailer[0]}?autoplay=1`}/>
                                    <Favorite userFrom={localStorage.getItem('userId')} movieId={movieId} movieInfo={Movie}/>
                                </Space>
                            </Col>
                        </Row>


                        {/* Info film dalam table */}
                        <Divider orientation="left">Movie Info</Divider>
                        {!LoadingForMovie ?
                            <MovieInfo movie={Movie} />
                            :
                            <div>loading...</div>
                        }

                        <br/>

                        {/* Tombol nampilin aktor */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={handleClick}>{Text}</Button>
                        </div>
                        <br/>


                        {/* Nampilin aktornya */}
                        {ActorTogle &&
                            <Row gutter={[16,16]}>
                                {Crews && Crews.map((cast, index) => (
                                    <React.Fragment key={index}>
                                        {cast.profile_path && 
                                            <GridCard
                                                actor 
                                                image={`${IMAGE_URL}w500${cast.profile_path}`}
                                                name={cast.name}
                                                character={cast.character}
                                            />
                                        }
                                    </React.Fragment>
                                ))}
                            </Row>
                        }

                        <Comments CommentList={CommentList} postId={movieId} refreshFunction={updateComment}/>
                    </div>
                </React.Fragment>
            }

            

        
        </div>
    )
}

export default MovieDetailPage
