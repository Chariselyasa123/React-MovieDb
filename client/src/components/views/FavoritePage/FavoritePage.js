import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import './favoritePage.css'
import { Popover } from 'antd'
import { IMAGE_URL } from '../../Config'

function FavoritePage() {

    const variables = { userFrom: localStorage.getItem('userId') }
    const [FavoriteMovie, setFavoriteMovie] = useState([])

    useEffect(() => {

        fetchFavoriteMovies()

    }, [])

    const fetchFavoriteMovies = () => {
        Axios.post('/api/favorite/getFavoriteMovie', variables)
            .then(response=>{
                if(response.data.success) {
                    setFavoriteMovie(response.data.favorites)
                }else{
                    alert('Filed to get favorited videos')
                }
            })
    }

    const onClickRemove = (id) => {

        const variable = {
            movieId: id,
            userFrom: localStorage.getItem('userId')
        }

        Axios.post('/api/favorite/removeFromFavorite', variable)
            .then(response=>{
                if(response.data.success) {
                    fetchFavoriteMovies()
                }else{
                    alert('Failed to remove from favorite')
                }
            })

    }

    const renderTableBody = FavoriteMovie.map((movie, index) => {

        const content = (
            <div>
                {movie.movieImage ? 
                <img src={`${IMAGE_URL}w500${movie.movieImage}`} alt="movieImage"/>
                :
                "No Image"
                }
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={`${movie.movieTitle}`}>
                <td>{movie.movieTitle}</td>
            </Popover>
            <td>{movie.movieRuntime}</td>
            <td><button onClick={()=>onClickRemove(movie.movieId)}>Remove</button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>Film Favorite Saya 🎬</h1>
            <hr/>
            <table>
                <thead>
                    <tr>
                        <th>Judul Film</th>
                        <th>Waktu Tayang Film</th>
                        <th>Buang Dari Favorite</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
