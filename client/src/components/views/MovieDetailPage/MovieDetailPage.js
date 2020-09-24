import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import Mainimage from '../LandingPage/Section/Mainimage'
import { Button, Descriptions, Row, Col } from 'antd'
import GridCard from '../LandingPage/Section/GridCard'
import Favorite from './Sections/Favorite'
import Comments from './Sections/Comments'
import Axios from 'axios'
import LikeDislike from './Sections/LikeDislike'
import MovieInfo from './Sections/MovieInfo'

function MovieDetailPage(p) {

    const [Movie, setMovie] = useState([])
    const [Crews, setCrews] = useState([])
    const [ActorTogle, setActorTogle] = useState(true)
    const [Text, setText] = useState("")
    const [CommentList, setCommentList] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
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
                // console.log(result)
                setMovie(result)
                setLoadingForMovie(false)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        // console.log(result)
                        setCrews(result.cast)
                    })

                setLoadingForCasts(false)
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
            {/* Gambar utama */}
            {!LoadingForMovie ?
                <Mainimage 
                    image={`${IMAGE_URL}w1280${Movie.backdrop_path}`} 
                    title={Movie.original_title}
                    text={Movie.overview}
                />
                :
                <div>loading...</div>
            }

            {/* BODY */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <Row>
                    <Col span={8}> 
                    
                        <LikeDislike movie movieId={movieId} userId={localStorage.getItem('userId')} styleMovie={{ paddingRight: '1rem' }}/> 
                    
                    </Col>
                    <Col span={8} offset={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Favorite userFrom={localStorage.getItem('userId')} movieId={movieId} movieInfo={Movie}/>
                    </Col>
                </Row>

                {/* Info film dalam table */}
                {!LoadingForMovie ?
                    <MovieInfo movie={Movie} />
                    :
                    <div>loading...</div>
                }

                <br/>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleClick}>{Text}</Button>
                </div>
                <br/>

                {/* Grid Card Untuk para aktor */}
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


        </div>
    )
}

export default MovieDetailPage
