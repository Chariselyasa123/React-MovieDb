import React from 'react'
import { Col } from 'antd'

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
    } else {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${p.movieId}`}>
                        <img style={{ width: '100%', height: '320px' }} alt="img" src={p.image}/>
                    </a>
                </div>
            </Col>
        )
    }

}

export default GridCard
