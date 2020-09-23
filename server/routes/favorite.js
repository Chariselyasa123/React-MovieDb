const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================


router.post("/favoriteNumber", auth, (req, res) => {
    
    // Cari informasi favorite dalam koleksi favorite by Movie ID
    Favorite.find({"movieId": req.body.movieId})
        .exec((e, favorite)=>{
            if(e) return res.status(400).send(e)
            res.status(200).json({ success: true, favoriteNumber:favorite.length })
        })
});

router.post("/favorited", auth, (req, res) => {
    
    // Cari informasi favorite di dalam koleksi favorite by Movie Id and userFrom
    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
        .exec((e, favorite)=>{
            if(e) return res.status(400).send(e)

            // Bagaimana kita tahu jika sudah memfavoritkan film ini atau belum ?
            let result = false
            if(favorite.length !== 0){
                result = true
            }

            res.status(200).json({ success: true, favorited: result })
        })
});

router.post("/addToFavorite", auth, (req, res) => {
    
    // Simpan informasi tentang Movie atau User ID didalam koleksi favorite
    const favorite = new Favorite(req.body)

    favorite.save((e, doc) => {
        if(e) return res.json({ success: false, e })
        return res.status(200).json({ success: true, doc })
    })
});

router.post("/removeFromFavorite", auth, (req, res) => {
    
    Favorite.findOneAndDelete({ 
        movieId: req.body.movieId,
        userFrom: req.body.userFrom
    }).exec((e, doc) => {
        if(e) return res.status(400).json({ success: false, e })
        res.status(200).json({ success: true, doc })
    })
});


module.exports = router;
