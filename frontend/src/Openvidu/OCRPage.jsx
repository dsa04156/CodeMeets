import { useState } from "react";

import styled from "styled-components";

const OCRPage = () => {
    const [ocrText, setOcrText] = useState("") 

    const textData = (result) =>{
        setOcrText(result)
    }


    return (
        <div>
            <p>
            아아아아아아아아아어어어어오오오오우우우이이이이
            </p> 
            <button>복사하기 버튼</button>
        </div>
    )
}

export default OCRPage;

