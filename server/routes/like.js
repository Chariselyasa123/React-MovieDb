const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

const { auth } = require("../middleware/auth");

//=================================
//             Like & Dislike
//=================================

router.post("/getLikes", (req, res) => {

    let variable = {}
    if(req.body.movieId) {
        variable = { movieId: req.body.movieId }
    }else{
        variable = { commentId: req.body.commentId }
    }

    Like.find(variable)
        .exec((e, likes) => {
            if(e) return res.status(400).send(e)
            res.status(200).json({ success: true, likes })
        })

}) 

router.post("/getDislikes", (req, res) => {

    let variable = {}
    if(req.body.movieId) {
        variable = { movieId: req.body.movieId }
    }else{
        variable = { commentId: req.body.commentId }
    }

    Dislike.find(variable)
        .exec((e, dislikes) => {
            if(e) return res.status(400).send(e)
            res.status(200).json({ success: true, dislikes })
        })

})

router.post("/upLike", (req, res) => {

    let variable = {}
    if(req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.body.userId }
    }else{
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const like = new Like(variable)
    // Simpan Like informasi data di mongoDb
    like.save((e, likeResult) => {
        if(e) return res.json({ success: false, e })
        // Skenario jika button Like sudah dilike, Kita harus decrement like nya
        Dislike.findOneAndDelete(variable)
            .exec((e, dislikeResult) => {
                if(e) return res.status(400).json({ success: false, e })
                res.status(200).json({ success:true })
            })
    })


})

router.post("/unLike", (req, res) => {

    let variable = {}
    if(req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.body.userId }
    }else{
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((e, result) => {
            if(e) return res.status(400).json({ success: false, e })
            res.status(200).json({ success:true })
        })


}) 

router.post("/upDislike", (req, res) => {

    let variable = {}
    if(req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.body.userId }
    }else{
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const dislike = new Dislike(variable)
    // Simpan Like informasi data di mongoDb
    dislike.save((e, likeResult) => {
        if(e) return res.json({ success: false, e })
        // Skenario jika button Like sudah dilike, Kita harus decrement like nya
        Like.findOneAndDelete(variable)
            .exec((e, likeResult) => {
                if(e) return res.status(400).json({ success: false, e })
                res.status(200).json({ success:true })
            })
    })


})

router.post("/unDislike", (req, res) => {

    let variable = {}
    if(req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.body.userId }
    }else{
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable)
        .exec((e, result) => {
            if(e) return res.status(400).json({ success: false, e })
            res.status(200).json({ success:true })
        })


}) 



module.exports = router;
