import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { APIroot, user } from '../../Store';
import styled from 'styled-components';

const GroupQnACreate = () => {
  const [qnaTitle, setQnaTitle] = useState();
  const [qnaContent, setQnaContent] = useState();

  const loginUser = useRecoilValue(user);
  const API = useRecoilValue(APIroot);
  const params = useParams();
  const groupPk = params.group_pk;

  const navigate = useNavigate();
  const writeTitleHandler = (event) => {
    setQnaTitle(event.target.value);
  };

  const writeContentHandler = (event) => {
    setQnaContent(event.target.value);
  };

  // 글 작성
  const registrationHandler = () => {
    axios({
      method: 'POST',
      url: `${API}/qna`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        groupQuestionContents: qnaContent,
        groupQuestionTitle: qnaTitle,
        groupPk: groupPk,
        userName: loginUser.userName,
        userPk: loginUser.userPk,
        groupQuestionAnswerCnt: '',
        groupQuestionDate: '',
        groupQuestionLike: '',
        groupQuestionLikeCnt: '',
        groupQuestionPk: '',
        groupQuestionUpdate: '',
      }),
    }).then(() => {
      navigate(-1);
    });
  };

  const cancelHandler = () => {
    navigate(-1);
  };
  return (
    <div>
      <TitleStyle>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          onChange={writeTitleHandler}
          style={{ width: '953px', height: '30px' }}
        />
      </TitleStyle>
      <hr style={{ width: '953px' }} />
      <ContentStyle>
        <textarea
          placeholder="내용을 입력하세요. 최대 255자까지 가능"
          onChange={writeContentHandler}
          style={{ width: '953px', height: '450px', resize: 'none' }}
        ></textarea>
      </ContentStyle>
      <ButtonStyle>
        <button className="custom-btn btn-4" onClick={cancelHandler}>
          Cancel
        </button>
      </ButtonStyle>
      <ButtonStyle>
        <button className="custom-btn btn-4" onClick={registrationHandler}>
          Registration
        </button>
      </ButtonStyle>
    </div>
  );
};

export default GroupQnACreate;

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
