import React from 'react'
import { Typography } from 'antd'
import { StarFilled } from '@ant-design/icons'

const { Title } = Typography

function Mainimage(props) {
    return (
        <div style={{ 
            background: `linear-gradient(to bottom, rgba(0,0,0,0)39%,rgba(0,0,0,0)41%,rgba(0,0,0,0.65)100%),url('${props.image}'), #1c1c1c`,
            height: '500px',
            backgroundSize: '100%, cover',
            width: '100%',
            position: 'relative'
        }}>
            <div>
                <div style={{ position: 'absolute',maxWidth: '500px',bottom: '2rem',marginLeft: '2rem' }}>
                    <Title style={{ color: 'white' }} level={2} >{props.title} <StarFilled style={{ color: 'yellow' }}/> {props.rating}</Title>
                    <p style={{ color: 'white', fontSize: '1rem' }}>{props.text}</p>
                </div>
            </div>

        </div>
    )
}

export default Mainimage
