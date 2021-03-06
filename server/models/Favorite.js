const mongoose = require('mongoose');
const Schema = mongoose.Schema

const favoriteSchema = mongoose.Schema({
   userFrom: {
       type: Schema.Types.ObjectId,
       ref: 'user'
   },
   movieId: {
       type: String
   },
   movieTitle: {
       type: String
   },
   movieImage: {
       type: String
   },
   movieRuntime: {
       type: String
   }
})


const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }