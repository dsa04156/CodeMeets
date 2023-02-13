import { useState } from "react";

import styled from "styled-components";

const OCRPage = ({ ocrResult }) => {
  const [ocrText, setOcrText] = useState({});

  const textData = (result) => {
    setOcrText(result);
  };

  return (
    <div>
      <OcrBox>{ocrResult}</OcrBox>
      <button>복사하기 버튼</button>
    </div>
  );
};

export default OCRPage;

const OcrBox = styled.p`
  white-space: pre-line;
`;
