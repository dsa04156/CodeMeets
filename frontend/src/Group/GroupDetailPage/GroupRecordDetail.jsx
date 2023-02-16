import React, { useEffect, useState } from 'react';
import { APIroot, user } from '../../Store';
import { useRecoilValue } from 'recoil';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import TitleStyle from './GroupDetailPageComponent/TitleStyle';
import GroupMeetingListInfo from './GroupDetailPageComponent/GroupMeetingListInfo';
import CommentContentStyle from './GroupDetailPageComponent/CommentContentStyle';

import axios from 'axios';

import styled from 'styled-components';

const GroupRecordDetail = () => {
  const API = useRecoilValue(APIroot);
  const loginUser = useRecoilValue(user);
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const groupRecord = location.state;
  console.log(groupRecord);
  const [newComment, setNewComment] = useState('');
  const [RecordTitle, setRecordTitle] = useState(groupRecord.title);
  const [RecordContent, setRecordContent] = useState(groupRecord.content);
  const [CommentsInConference, setCommentsInConference] = useState([]);

  // 회의 내 질문 목록들 가져오기
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API}/conferenceQna?conferencePk=${params.conferencePk}`,
      headers: {
        AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    }).then((response) => {
      console.log(response.data)
      setCommentsInConference(response.data);
    });
  }, [API]);

  const backHandler = () => {
    navigate(-1);
  };

  const conferenceInfoList = CommentsInConference.map((infoItem, index) => {
    return (
      <GroupMeetingListInfo
        key={index}
        conferencePk={infoItem.conferencePk}
        conferenceTitle={infoItem.conferenceTitle}
        conferenceQuestionContents={infoItem.conferenceQuestionContents}
        conferenceQuestionDate={infoItem.conferenceQuestionDate}
        conferenceQuestionPk={infoItem.conferenceQuestionPk}
        groupPk={infoItem.groupPk}
        groupName={infoItem.groupName}
        userPk={infoItem.userPk}
        username={infoItem.username}
        answerCnt={infoItem.answerCnt}
        conferenceQuestionLikeCnt={infoItem.conferenceQuestionLikeCnt}
        conferenceQuestionLiked={infoItem.conferenceQuestionLiked}
        conferenceQuestionUpdate={infoItem.conferenceQuestionUpdate}
      />
    );
  });

  return (
    <div>
      <OverStyle>
        <TitleStyle TitleContent={RecordTitle} />
        <div style={{ margin: '3vh' }}>{RecordContent}</div>
        <HrStyle>
          <hr style={{ width: '954px' }} />
        </HrStyle>
        <ContentsStyle>질문리스트</ContentsStyle>
        <div>
          {conferenceInfoList.length > 0 ? (
            <CommentContentStyle Content={conferenceInfoList} />
          ) : (
            <div style={{ margin: '50px 50px 50px 50px' }}>
              질문이 없습니다.
            </div>
          )}
        </div>
        <ButtonStyle>
          <button className="custom-btn btn-4" onClick={backHandler}>
            Back
          </button>
        </ButtonStyle>
      </OverStyle>
    </div>
  );
};

export default GroupRecordDetail;

const OverStyle = styled.div`
  overflow-y: auto;
`;

const HrStyle = styled.div`
  margin: 20px 0px 5px 0px;
`;

const ContentsStyle = styled.div`
  border: 1px;
  display: flex;
  flex-direction: column;
  font-size: 5vh;
  margin: 3vh;
  font-family: 'yanoljaBold';
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
    display: inline-block;
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
