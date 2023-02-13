import { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import axios from 'axios';

function Crop({image, OCRhandler}) {
    console.log(image)
    const cropperRef = useRef(null);
  // 유저가 첨부한 이미지
  const [inputImage, setInputImage] = useState(null);
  // 유저가 선택한 영역만큼 크롭된 이미지 
  const [croppedImage, setCroppedImage] = useState(null);

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };


///////////////////////////////////////////////////////////////////////

const imageInput = useRef(null);
const [imageText, setImgText] = useState("");

const [imgFile, setImgFile] = useState();


let formdata = new FormData();


// const inputing = () => {
//   var file = dataURLtoFile(`${croppedImage}`,'OCR.png');

//   console.log("크롭된 이미지의 console:", file)
//   formdata.append("file", file);
//   formdata.append("message", JSON.stringify(
//     {
//       "images": [
//         {
//           "format": "png",
//           "name": "medium",
//           "data": null,
//           "url": null
//         }
//       ],
//       "lang": "ko",
//       "requestId": "string",
//       "resultType": "string",
//       "timestamp": 172131223,
//       "version": "V2"
//   }
//   ))
//   console.log(formdata)
// };

const sendAxios = () => {
  for (let value in formdata.values()) {
    console.log(value);
  }
  console.log("---------------------------------------- 이건 axios",croppedImage)
  axios
    .post(
      "20467/b8b67c0b1215d9b02d9013f67bec45f7ef32d0b00a3945d5058169d08e3b7e07/general",
      {
        images:[
          {
            format: "png",
            name:"medium",
            data: `${croppedImage.split(',')[1]}`
          }
        ],
        requestId: 'string',
        timestamp: 0,
        version: 'V2'
      },
      {
        headers: {
          "X-OCR-SECRET": "b3RteXpOU0NPTG5PQmdKWXNZWlNGQ1pqdmN2cHRXb3k=",
        },
        withCredentials: true,
        proxy: { host: "https://282c769uda.apigw.ntruss.com/custom/v1/" },
      }
    )
    // https://282c769uda.apigw.ntruss.com/custom/v1/20467/b8b67c0b1215d9b02d9013f67bec45f7ef32d0b00a3945d5058169d08e3b7e07/general
    .then((res) => {
      console.log(res)
      for (let i in res.data.images[0].fields) {
        console.log(res.data.images[0].fields[i].inferText)
        if (res.data.images[0].fields[i].lineBreak === true) {
          setImgText(prev => {
            console.log(imageText)
            return prev + " " + res.data.images[0].fields[i].inferText + "\n"
          })} else {
          setImgText(prev => {
            console.log(imageText)
            return prev + " " + res.data.images[0].fields[i].inferText
        })}
      }
      console.log(imageText)
    }).then(
      OCRhandler(imageText),
      setImgText("")
    )
    .catch((err) => console.log(err));
};

// // base 64 to file
// const dataURLtoFile = (dataurl, fileName) => {
 
//   var arr = dataurl.split(','),
//       mime = arr[0].match(/:(.*?);/)[1],
//       bstr = atob(arr[1]), 
//       n = bstr.length, 
//       u8arr = new Uint8Array(n);
      
//   while(n--){
//       u8arr[n] = bstr.charCodeAt(n);
//   }
  
//   return new File([u8arr], fileName, {type:mime});
// }



////////////////////////////////////////////////////////////////////////
  return (
    <div>
      {/* <input type="file" accept="image/*" onChange={(e) => setInputImage(URL.createObjectURL(e.target.files[0]))} /> */}
      {/* <button onClick={inputing}>send OCR</button> */}
      <button onClick={sendAxios}>text</button>
      <Cropper src={image} crop={onCrop} ref={cropperRef} />
      <img src={croppedImage} />
      {imageText}
    </div>
  );
}

export default Crop;