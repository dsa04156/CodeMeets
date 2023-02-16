import styled from 'styled-components';
import { FaRegCopy } from 'react-icons/fa';

const OCRPage = ({ ocrResult }) => {
  const CopyHandler = () => {
    try {
      navigator.clipboard.writeText(ocrResult);
      alert('클립보드 복사완료');
    } catch (error) {
      alert('복사 실패');
    }
  };

  return (
    <OcrPageStyle>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            padding: '3px',
          }}
        >
          <div style={{ fontSize: '5px', marginRight: '10px' }}>
            OCR Result - Copy
          </div>
          <FaRegCopy
            style={{ cursor: 'pointer' }}
            onClick={() => {
              CopyHandler();
            }}
          ></FaRegCopy>
        </div>
        <OcrContainer>
          <OcrBox
            style={{
              fontSize: '9px',
              paddingLeft: '10px',
              paddingRight: '10px',
              paddingBottom: '10px',
            }}
          >
            {ocrResult}
          </OcrBox>
        </OcrContainer>
      </div>
    </OcrPageStyle>
  );
};

export default OCRPage;

const OcrBox = styled.p`
  white-space: pre-line;
`;

const OcrContainer = styled.div`
  height: 12vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const OcrPageStyle = styled.div`
  border-radius: 10px;
  background-color: #e5e1d7;
  border: 2px solid grey;
  height: 15vh;
  margin-bottom: 1vh;
  overflow: hidden;
`;
