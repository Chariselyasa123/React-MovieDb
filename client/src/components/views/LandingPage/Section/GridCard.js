import React from 'react'
import { Col } from 'antd'
import styles from './mainImage.module.css'

function GridCard(p) {

    if(p.actor) {
        return(
            <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <img style={{ width: '100%', height: '320px' }} alt="img" src={p.image}/>
                <p style={{ textAlign: 'center' }}>{p.name} <strong>AS</strong> {p.character}</p>
            </div>
        </Col>
        )
    } else if (p.topRated) {
        return (
                <Col style={{ margin:'10px 10px' }}>
                    <div>
                        <a href={`/movie/${p.movieId}`} className={styles.gridCard} data-content={`${p.title} ⭐ ${p.rating}`}>
                            <img style={{ width: '100%', height: '320px' }} alt="img" src={p.image}/>
                        </a>
                    </div>
                </Col>
        )
    } else{
        return(
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${p.movieId}`} className={styles.gridCard} data-content={`${p.title} ⭐ ${p.rating}`}>
                        <img style={{ width: '100%', height: '320px' }} alt="img" src={p.image}/>
                    </a>
                </div>
            </Col>
        )
    }

}

export default GridCard
