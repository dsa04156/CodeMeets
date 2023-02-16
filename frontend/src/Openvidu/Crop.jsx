import { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { CgFormatText } from "react-icons/cg";
import { RiArrowGoBackFill } from "react-icons/ri";

import axios from "axios";

import styled from "styled-components";

function Crop({ image, OCRhandler, closeHandler }) {
  console.log(image);
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


  const imageInput = useRef(null);
  const [imageText, setImgText] = useState("");

  const [imgFile, setImgFile] = useState();

  let formdata = new FormData();

  const sendAxios = () => {
    for (let value in formdata.values()) {
      console.log(value);
    }
    console.log(
      "---------------------------------------- 이건 axios",
      croppedImage
    );
    axios
      .post(
        "20467/b8b67c0b1215d9b02d9013f67bec45f7ef32d0b00a3945d5058169d08e3b7e07/general",
        {
          images: [
            {
              format: "png",
              name: "medium",
              data: `${croppedImage.split(",")[1]}`,
            },
          ],
          requestId: "string",
          timestamp: 0,
          version: "V2",
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
        console.log(res);
        let prevText = "";
        for (let i in res.data.images[0].fields) {
          console.log(
            "이게 뜨는거 ------ ",
            res.data.images[0].fields[i].inferText
          );
          if (res.data.images[0].fields[i].lineBreak === true) {
            console.log(
              prevText + " " + res.data.images[0].fields[i].inferText + "\n"
            );
            prevText =
              prevText + " " + res.data.images[0].fields[i].inferText + "\n";
            // setImgText(prev => {
            //   console.log(imageText)
            //   return prev + " " + res.data.images[0].fields[i].inferText + "\n"
            // })
          } else {
            console.log(
              prevText + " " + res.data.images[0].fields[i].inferText
            );
            prevText = prevText + " " + res.data.images[0].fields[i].inferText;
            //   setImgText(prev => {
            //     console.log(imageText)
            //     return prev + " " + res.data.images[0].fields[i].inferText
            // })
          }
        }
        OCRhandler(prevText);
      })
      .then(setImgText(""))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <Cropper
          src={image}
          crop={onCrop}
          ref={cropperRef}
          style={{ height: "78vh", width: "150.2vh" }}
        />
      </div>
      <ToolBar>
        <CgFormatText
          onClick={sendAxios}
          size = "35"
          style={{ 
            marginRight: "10vh",
            cursor: "pointer" 
          }}
        />
        <RiArrowGoBackFill
          onClick={() => {
            closeHandler();
          }}
          size = "35"
          style={{cursor: "pointer" }}
        />
      </ToolBar>
    </div>
  );
}

export default Crop;

const ToolBar = styled.div`
  border: 2px solid grey;
  padding-right: 10vh;
  border-radius: 10px;
  margin-top: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(142, 195, 176);
`;
