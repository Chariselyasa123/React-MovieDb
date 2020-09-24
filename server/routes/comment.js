const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================


router.post("/saveComment", auth, (req, res) => {
    
    const commet = new Comment(req.body)

    commet.save((e, comment) => {
        if(e) return res.json({ success: false, e })
        
        Comment.find({ '_id': comment._id }).populate('writer')
            .exec((e, result) => {
                if(e) return res.json({ success:false, e })
                return res.status(200).json({ success:true, result })
            })
    })

});

router.post("/getComments", (req, res) => {

    Comment.find({ "postId": req.body.movieId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
});


module.exports = router;
