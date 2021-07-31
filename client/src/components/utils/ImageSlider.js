import React from 'react'
import { Icon, Col, Card, Row, Carousel } from 'antd';

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay >  {/* autoplay는 자동으로 이미지가 이동될 수 있게 해주는 처리 */}
                {props.images.map((image, index) => (
                    //부모쪽에서(Laniding페이지에서) 전달된 이미지들({product.images})은 props.images이렇게 받을 수 있음
                    <div key={index}>
                        {/* key={index}는 map사용하면서 가져오는 인덱스로인한 에러 제거위해 처리해주는것 */}
                        <img style={{ width: '100%', maxHeight: '150px' }}
                            src={`http://localhost:5000/${image}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
