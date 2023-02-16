import { useRecoilValue } from 'recoil';
import { APIroot } from '../../Store';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const GroupNoticeModify = () => {
  const API = useRecoilValue(APIroot);
  const location = useLocation();
  const navigate = useNavigate();
  const firstData = location.state;
  const [formTitle, setFormTitle] = useState(firstData.title);
  const [formContent, setFormContent] = useState(firstData.content);

  const titleHandler = (event) => {
    const currentTitle = event.target.value;
    setFormTitle(currentTitle);
  };

  const contentHandler = (event) => {
    const currentContent = event.target.value;
    setFormContent(currentContent);
  };

  const backHandler = () => {
    navigate(-1);
  };

  // 수정
  const submitHandler = (event) => {
    event.preventDefault();
    axios({
      method: 'PUT',
      url: `${API}/group-notice`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        groupNoticeTitle: `${formTitle}`,
        groupNoticePk: `${firstData.noticePk}`,
        groupNoticeContents: `${formContent}`,
        originFilename: '',
        dbFilename: '',
      }),
    })
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <TitleStyle>
        <input
          type="text"
          defaultValue={`${formTitle}`}
          onChange={titleHandler}
          style={{ width: '953px', height: '30px' }}
        />
      </TitleStyle>
      <hr style={{ width: '953px' }} />
      <ContentStyle>
        <textarea
          type="text"
          defaultValue={`${formContent}`}
          onChange={contentHandler}
          style={{ width: '953px', height: '450px', resize: 'none' }}
        />
      </ContentStyle>
      <ButtonStyle>
        <button className="custom-btn btn-4" onClick={backHandler}>
          Cancel
        </button>
      </ButtonStyle>
      <ButtonStyle>
        <button className="custom-btn btn-4" onClick={submitHandler}>
          Registration
        </button>
      </ButtonStyle>
    </div>
  );
};

export default GroupNoticeModify;

const TitleStyle = styled.div`
  margin: 30px 20px 12px 20px;
`;
const ContentStyle = styled.div`
  margin: 12px 20px 0px 20px;
`;

const ButtonStyle = styled.div`
  .custom-btn {
    width: 100px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 20px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    float: right;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
  }
  .btn-4 {
    background-color: #4dccc6;
    background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
    line-height: 42px;
    padding: 0;
    border: none;
  }
  .btn-4:hover {
    background-color: #89d8d3;
    background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
  }
  .btn-4 span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .btn-4:before,
  .btn-4:after {
    position: absolute;
    content: '';
    right: 0;
    top: 0;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  .btn-4:before {
    height: 0%;
    width: 0.1px;
  }
  .btn-4:after {
    width: 0%;
    height: 0.1px;
  }
  .btn-4:hover:before {
    height: 100%;
  }
  .btn-4:hover:after {
    width: 100%;
  }
  .btn-4 span:before,
  .btn-4 span:after {
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  .btn-4 span:before {
    width: 0.1px;
    height: 0%;
  }
  .btn-4 span:after {
    width: 0%;
    height: 0.1px;
  }
  .btn-4 span:hover:before {
    height: 100%;
  }
  .btn-4 span:hover:after {
    width: 100%;
  }
`;
