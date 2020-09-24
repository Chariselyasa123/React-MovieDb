import React, { useEffect, useState } from 'react'
import SinggleComment from './SinggleComment';

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {

        let commentNumber = 0;
        props.CommentList.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
            return commentNumber
        })
        setChildCommentNumber(commentNumber)
    }, [props.CommentList, props.parentCommentId])


    let renderReplyComment = (parentCommentId) =>
        props.CommentList.map((comment, index) => (
            <React.Fragment key={index}>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SinggleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentList={props.CommentList} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} />
                    </div>
                }
            </React.Fragment>
        ))

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }


    return (
        <div>

            {ChildCommentNumber > 0 &&
                <a style={{ fontSize: '14px', margin: 0, color: 'gray' }}
                    onClick={handleChange} >
                    View {ChildCommentNumber} more comment(s)
             </a>
            }

            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }

        </div>
    )
}

export default ReplyComment