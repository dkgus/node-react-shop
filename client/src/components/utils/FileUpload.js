import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import axios from 'axios';


function FileUpload(props) {

    const [Images, setImages] = useState([])//이미지가 여러장 들어갈 수 있도록 []객체 사용
    //그리고 useState에 업로드된 파일의 이름과 경로를 저장

    const dropHandler = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/fomr-data' }
        }
        formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.filePath])
                                //...Images 안에는 useState[]안에 저장된 여러개의 사진이 저장되어있음
                                //그리고 filePath까지 마지막으로 useState[]안에 저장됨
                    props.refreshFunction([...Images, response.data.filePath])
                    //이미지를 등록할때의 상태변화를 props로 가져옴.refreshFunction는 앞서 지정한 props의 이름


                } else {
                    alert('파일을 저장하는데 실패했습니다.')
                }
            })
    }


    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);//인덱스와 이미지 매칭작업(image 1 = index 0)
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)//splice를 통해 지우고싶은 곳의 인덱스(currentIndex부터 지우고 싶은 개수. 2를 적으면 현재 것부터 2개가 삭제됨
        setImages(newImages)//이번에는 setImage(state)에 이미지와 파일 이름대신 splice되고 남은 것들이 반환 
        props.refreshFunction(newImages)
        //이미지를 삭제할 때도 상태변화 생기므로 props가져옴. 이것은 다 부모컴포넌트에 이미지변화 상태를 전달하기위해 하는 작업임
        
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{
                            width: 300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (//이미지가 여러장이므로 map이용하여 하나하나 컨트롤 가능
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}


            </div>


        </div>
    )
}

export default FileUpload
