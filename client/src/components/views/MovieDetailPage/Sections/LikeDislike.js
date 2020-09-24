import React, { createElement, useEffect, useState } from 'react'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';

function LikeDislike(p) {
    const user = useSelector(state => state.user)

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = {}

    if(p.movie){
        variable = {
            movieId: p.movieId,
            userId: p.userId
        }
    }else{
        variable = {
            commentId: p.commentId,
            userId: p.userId
        }

    }

    useEffect(() => {
        
        Axios.post('/api/like/getLikes', variable)
            .then(response=>{
                if(response.data.success){

                    // Berapa banyak Like filim ini disukai
                    setLikes(response.data.likes.length)

                    // Jika sudah di Like atau belum ?
                    response.data.likes.map(like => {
                        if(like.userId === p.userId){
                            setLikeAction('liked')
                        }
                    })
                }else{
                    alert('Filed to get Likes')
                }
            })

        Axios.post('/api/like/getDislikes', variable)
            .then(response=>{
                if(response.data.success){

                    // Berapa banyak Like filim ini disukai
                    setDislikes(response.data.dislikes.length)

                    // Jika sudah di Like atau belum ?
                    response.data.dislikes.map(like => {
                        if(like.userId === p.userId){
                            setDislikeAction('disliked')
                        }
                    })
                }else{
                    alert('Filed to get Dislikes')
                }
            })

    }, [])

    const onLike = () => {
        
        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if (LikeAction === null) {

            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        //If dislike button is already clicked

                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }


                    } else {
                        alert('Failed to increase the like')
                    }
                })

        } else {

            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert('Failed to decrease the like')
                    }
                })

        }
    }

    const onDislike = () => {

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if (DislikeAction !== null) {

            Axios.post('/api/like/unDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert('Failed to decrease dislike')
                    }
                })

        } else {

            Axios.post('/api/like/upDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        //If dislike button is already clicked
                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }

                    } else {
                        alert('Failed to increase dislike')
                    }
                })


        }

    }

    return (
        <React.Fragment>
            <Tooltip key="comment-basic-like" title="Like This Movie">
                <span style={p.styleMovie} onClick={onLike}>
                    {createElement(LikeAction === 'liked' ? LikeFilled : LikeOutlined)}
                    <span className="comment-action" style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
                </span>
            </Tooltip>
            <Tooltip key="comment-basic-dislike" title="Dislike This Movie">
                <span onClick={onDislike}>
                    {React.createElement(DislikeAction === 'disliked' ? DislikeFilled : DislikeOutlined)}
                    <span className="comment-action" style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
                </span>
            </Tooltip>
        </React.Fragment>
    )
}

export default LikeDislike
