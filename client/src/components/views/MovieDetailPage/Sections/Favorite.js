import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';

function Favorite(p) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    const variable = {
        userFrom: p.userFrom,
        movieId: p.movieId,
        movieTitle: p.movieInfo.original_title,
        movieImage: p.movieInfo.backdrop_path,
        movieRuntime: p.movieInfo.runtime
    }

    useEffect(() => {


        axios.post('/api/favorite/favoriteNumber', variable)
            .then(response=>{
                if(response.data.success){
                    setFavoriteNumber(response.data.favoriteNumber)
                }else{
                    alert('Filed to get favorite number')
                }
            })
        
        axios.post('/api/favorite/favorited', variable)
            .then(response=>{
                if(response.data.success){
                    setFavorited(response.data.favorited)
                }else{
                    alert('Filed to get favorite info')
                }
            })
    }, [])

    const onClickFavorite = () => {
        if(Favorited){

            // ketika sudah ditambah favorite
            axios.post('/api/favorite/removeFromFavorite', variable)
                .then(response=>{
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    }else{
                        alert('Failed to remove from favorite')
                    }
                })
        }else{

            // Ketika belum ditambah favorite
            axios.post('/api/favorite/addToFavorite', variable)
                .then(response=>{
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    }else{
                        alert('Failed to add to Favorites')
                    }
                })
        }
    }

    return (
        <div>
            <Tooltip key="favorite" title={Favorited ? "Click to remove Favorite" : "Click to add Favorite"}>
                <a onClick={onClickFavorite} style={{ fontSize: '25px', color: 'red' }}>{React.createElement(Favorited ? HeartFilled : HeartOutlined)}</a>
            </Tooltip>
        </div>
    )
}

export default Favorite
