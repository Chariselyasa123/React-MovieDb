import React, { useState } from 'react'
import { YoutubeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Modal } from 'antd';

function WatchTrailer(p) {

    const [Visible, setVisible] = useState(false)

    const onClick = () => {
        setVisible(true)
    }

    const onCancle = () => {
        setVisible(false)
    }

    return (
        <div>
            <Tooltip key="watch-trailer" title="Watch Trailer">
                <a style={{ fontSize: '25px' }} onClick={onClick}>
                    <YoutubeOutlined />
                </a>
            </Tooltip>
            {/* <ReactPlayer
                url="https://www.youtube.com/watch?v=6uvRzDcEEJA&t"
            /> */}
        <Modal
          destroyOnClose={true}
          maskClosable
          visible={Visible}
          onCancel={onCancle}
          footer={null}
          style={{ right: '500px' }}
          width={0}
        >
            
            <iframe width="858" height="480" style={{ display: "flex" }} src={p.link} frameBorder="0" allowFullScreen ></iframe>

        </Modal>
      
        </div>
    )
}

export default WatchTrailer
