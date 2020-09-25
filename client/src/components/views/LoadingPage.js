import React from 'react'
import { Spin } from 'antd';

function LoadingPage() {

    const loadingStyle = {
        margin: 0,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }

    return (
        <div style={loadingStyle}>
            <Spin size="large" />
        </div>
    )
}

export default LoadingPage
