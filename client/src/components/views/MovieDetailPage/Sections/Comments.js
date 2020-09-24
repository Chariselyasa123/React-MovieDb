import React, { useState } from 'react'
import { Button, Input } from 'antd'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import SinggleComment from './SinggleComment'
import ReplyComment from './ReplyComment'
const { TextArea } = Input

function Comments(p) {

    const [Comment, setComment] = useState("")
    const user = useSelector(state => state.user)

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const variable = {
            content: Comment,
            writer: user.userData._id,
            postId: p.postId
        }

        Axios.post('/api/comment/saveComment', variable)
         .then(response=>{
             if(response.data.success){
                setComment("")
                p.refreshFunction(response.data.result)
             }else{
                 alert('Failed to save Comment')
             }
         })
    }

    return (
        <div>
            <br/>
            <p>Comment ✏</p>
            <hr/>
            {/* Comment List */}
            { p.CommentList && p.CommentList.map((comment, index) => (
                
                (!comment.responseTo &&
                    <React.Fragment>
                        <SinggleComment comment={comment} postId={p.postId} refreshFunction={p.refreshFunction}/>
                        <ReplyComment CommentList={p.CommentList} parentCommentId={comment._id} postId={p.postId} refreshFunction={p.refreshFunction}/>
                    </React.Fragment>
                )

            )) }

            {/* Root Comment From */}
            <form style={{ display: "flex" }} onSubmit={handleSubmit}>
                <TextArea
                    style={{ width: "100%", borderRadius: "5px" }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="Write Comments"
                    rows={4}
                />
                <br/>
                <Button style={{ width: "20%", height: "30px", marginLeft: '10px' }} onClick={handleSubmit}>Comment</Button>
            </form>
        </div>
    )
}

export default Comments
