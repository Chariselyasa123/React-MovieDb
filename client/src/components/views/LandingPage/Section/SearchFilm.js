import React from 'react'
import { Row, Col, Space, Input } from 'antd'
import { 
    FacebookFilled, 
    TwitterCircleFilled, 
    InstagramOutlined, 
    GithubOutlined, 
} from '@ant-design/icons';

const { Search } = Input

function SearchFilm() {
    return (
        <div>
            <Row>
                <Col flex="1 1 200px">
                    <Space size="small">
                        <a href="https://www.facebook.com/ahmadcharis" target="_blank">
                            <FacebookFilled style={{ fontSize: '20px', color: 'blue' }}/>
                        </a>
                        <a href="https://twitter.com/aceh_charis" target="_blank">
                            <TwitterCircleFilled style={{ fontSize: '20px', color: '#1DA1F2' }}/>
                        </a>
                        <a href="https://www.instagram.com/ahmad_elyasa/" target="_blank">
                            <InstagramOutlined style={{ fontSize: '20px', borderRadius: '6px', color: '#fff', background: '#d6249f', background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)' }}/>
                        </a>
                        <a href="https://github.com/Chariselyasa123" target="_blank">
                            <GithubOutlined style={{ fontSize: '20px', color: "#333" }}/>
                        </a>
                    </Space>
                </Col>
                <Col flex="0 1 350px">
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={value => console.log(value)}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default SearchFilm
