import { useRecoilValue } from 'recoil';
import { APIroot, user } from '../../Store';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TitleStyle from './GroupDetailPageComponent/TitleStyle';
import ContentStyle from './GroupDetailPageComponent/ContentStyle';
import HitStyle from './GroupDetailPageComponent/HitStyle';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const GroupNoticeDetail = () => {
  const params = useParams();
  const API = useRecoilValue(APIroot);
  const loginUser = useRecoilValue(user);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const ModifyHandler = () => {
    navigate('/group/notice/modify', {
      state: {
        title: data.groupNoticeTitle,
        content: data.groupNoticeContents,
        noticePk: data.groupNoticePk,
      },
    });
  };

  const ToListHandler = () => {
    navigate(-1);
  };
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API}/group-notice/${params.notice_pk}`,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      setData(response.data);
    });
  }, [API]);

  // 삭제
  const deleteHandler = () => {
    axios({
      method: 'DELETE',
      url: `${API}/group-notice?groupNoticePk=${params.notice_pk}`,
    }).then(() => {
      navigate(-1);
    });
  };

  return (
    <div>
      <TitleStyle TitleContent={data.groupNoticeTitle} />
      <HitStyle Hit={data.groupNoticeHit} />
      <ContentStyle Content={data.groupNoticeContents} />
      <ButtonStyle>
        <button className="custom-btn btn-4" onClick={ToListHandler}>
          Back
        </button>
      </ButtonStyle>
      {data.userPk === loginUser.userPk ? (
        <ButtonStyle>
          <button className="custom-btn btn-4" onClick={ModifyHandler}>
            Modify
          </button>
        </ButtonStyle>
      ) : null}
      {data.userPk === loginUser.userPk ? (
        <ButtonStyle>
          <button
            className="custom-btn btn-4"
            onClick={deleteHandler}
            style={{ float: 'left' }}
          >
            Delete
          </button>
        </ButtonStyle>
      ) : null}
    </div>
  );
};

export default GroupNoticeDetail;

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
