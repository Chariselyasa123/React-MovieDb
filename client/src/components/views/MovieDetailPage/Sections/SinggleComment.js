import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import LikeDislike from './LikeDislike'

function SinggleComment(p) {

    const user = useSelector(state => state.user)
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const variables = {
            writer: user.userData._id,
            postId: p.postId,
            responseTo: p.comment._id,
            content: CommentValue
        }

        Axios.post('/api/comment/saveComment', variables)
         .then(response=>{
             if(response.data.success){
                // console.log(response.data.result);
                setCommentValue("")
                setOpenReply(!OpenReply)
                p.refreshFunction(response.data.result)
             }else{
                 alert('Failed add Reply')
             }
         })
    }

    const action = [
        <>
            <LikeDislike comment commentId={p.comment._id} userId={localStorage.getItem('userId')}/>
            <span onClick={openReply} key="comment-basic-reply-to">Reply to</span>
        </>
    ];

    return (
        <div>
            <Comment
                actions={action}
                author={p.comment.writer.name}
                avatar={
                    <Avatar
                        src={p.comment.writer.image}
                        alt
                    />
                }
                content={
                    <p>
                        {p.comment.content}
                    </p>
                }
            ></Comment>

            {OpenReply &&
                <from style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="Write Comment"
                    />
                    <br/>
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </from>
            }
            
        </div>
    )
}

export default SinggleComment
