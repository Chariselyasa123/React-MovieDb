import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import Mainimage from '../LandingPage/Section/Mainimage'
import { Button, Descriptions, Row, Col } from 'antd'
import GridCard from '../LandingPage/Section/GridCard'
import Favorite from './Sections/Favorite'
import Comments from './Sections/Comments'
import Axios from 'axios'
import LikeDislike from './Sections/LikeDislike'

function MovieDetailPage(p) {

    const [Movie, setMovie] = useState([])
    const [Crews, setCrews] = useState([])
    const [ActorTogle, setActorTogle] = useState(true)
    const [Text, setText] = useState("")
    const [CommentList, setCommentList] = useState([])
    const movieId = p.match.params.movieId
    const movieVariable = {
        movieId: movieId
    }


    useEffect(() => {

        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)

                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(response => {
                        // console.log(response);
                        setCrews(response.cast)
                    })
            })
        
        Axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    // console.log('response.data.comments', response.data.comments)
                    setCommentList(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })

        handleClick()
    }, [])

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
            {Movie && 
                <Mainimage 
                    image={`${IMAGE_URL}w1280${Movie.backdrop_path}`} 
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            }

            {/* BODY */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <Row>
                    <Col span={8}> 
                    
                        <LikeDislike movie movieId={movieId} userId={localStorage.getItem('userId')} styleMovie={{ paddingRight: '1rem' }}/> 
                    
                    </Col>
                    <Col span={8} offset={8} style={{ display: 'flex', justifyContent: 'flex-end' }}  styleMovie={{ paddingRight: '1rem' }}>
                        <Favorite userFrom={localStorage.getItem('userId')} movieId={movieId} movieInfo={Movie}/>
                    </Col>
                </Row>

                {/* Info film dalam table */}
                <Descriptions title="Movie Info" bordered>
                    <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="Release Date">{Movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="Revenue">{Movie.revenue}</Descriptions.Item>
                    <Descriptions.Item label="Runtime">{Movie.runtime}</Descriptions.Item>
                    <Descriptions.Item label="Vote Average">{Movie.vote_average}</Descriptions.Item>
                    <Descriptions.Item label="Vote Vount">{Movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="Status">{Movie.status}</Descriptions.Item>
                    <Descriptions.Item label="Popularity">{Movie.popularity}</Descriptions.Item>
                </Descriptions>

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
