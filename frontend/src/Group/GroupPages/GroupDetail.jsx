import GroupNavBar from '../GroupComponents/GroupNavBar';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GroupLeaveModal from '../GroupModal/GroupLeaveModal';
import GroupDeleteModal from '../GroupModal/GroupDeleteModal';

import styled from 'styled-components';

import { groupNavTitle, APIroot } from '../../Store';
import { useRecoilState, useRecoilValue } from 'recoil';

const GroupDetail = () => {
  const [groupTitle, setGroupTitle] = useRecoilState(groupNavTitle);
  const [groupUrl, setGroupUrl] = useState('');
  const [leaveTheGroupModal, setLeaveTheGroupModal] = useState(false);
  const [DeleteTheGroupModal, setDeleteTheGroupModal] = useState(false);
  const API = useRecoilValue(APIroot);

  const params = useParams();

  const [position, setPosition] = useState();

  const groupTitleHandler = (title) => {
    setGroupTitle(title);
  };

  const leaveGroupHandler = () => {
    setLeaveTheGroupModal(true);
  };

  const DeleteGroupHandler = () => {
    setDeleteTheGroupModal(true);
  };

  const CopyHandler = () => {
    try {
      navigator.clipboard.writeText(groupUrl);
      alert('클립보드 복사완료');
    } catch (error) {
      alert('복사 실패');
    }
  };

  axios({
    method: 'POST',
    url: `${API}/group/${params.group_pk}/detail`,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    setGroupUrl(response.data.groupUrl);
  });

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API}/group/${params.group_pk}/member`,
      headers: {
        'Content-Type': 'application/json',
        AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    }).then((response) => {
      setPosition(response.data.position);
    });
  }, [API, position]);

  return (
    <div>
      <MainTitle>
        <h1>{groupTitle}</h1>
        <div className="url">Group URL : {groupUrl}</div>
        <div className="url">
          <SubButtonStyle>
            <button className="custom-btn btn-4" onClick={CopyHandler}>
              Copy
            </button>
          </SubButtonStyle>
        </div>
        <div className="position">
          <ButtonStyle>
            <button className="custom-btn btn-4" onClick={leaveGroupHandler}>
              Leave
            </button>
          </ButtonStyle>
          {leaveTheGroupModal && (
            <GroupLeaveModal
              open={leaveTheGroupModal}
              onClose={() => {
                setLeaveTheGroupModal(false);
              }}
              groupPk={params.group_pk}
            />
          )}
        </div>
        <div>
          <ButtonStyle>
            {position === 1 ? (
              <button className="custom-btn btn-4" onClick={DeleteGroupHandler}>
                Delete
              </button>
            ) : null}
          </ButtonStyle>
          {DeleteTheGroupModal && (
            <GroupDeleteModal
              open={DeleteTheGroupModal}
              onClose={() => {
                setDeleteTheGroupModal(false);
              }}
              groupPk={params.group_pk}
            />
          )}
        </div>
      </MainTitle>
      <GroupMainBoard>
        <GroupNavBar
          grouppk={params.group_pk}
          groupTitleFunc={groupTitleHandler}
        />
        <Outlet />
      </GroupMainBoard>
    </div>
  );
};

export default GroupDetail;

const MainTitle = styled.div`
  display: flex;
  align-items: center;
  border: 1px;
  padding-left: 30px;
  height: 90px;
  .url {
    margin: 10px 0px 0px 10px;
    width: auto;
    align-items: flex-end;
  }
  .position {
    float: right;
    margin-left: auto;
  }
`;

const GroupMainBoard = styled.div`
  height: 500px;
`;

const SubButtonStyle = styled.div`
  .custom-btn {
    width: 50px;
    height: 25px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
    justify-content: center;
    align-items: center;
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

const ButtonStyle = styled.div`
  .custom-btn {
    width: 100px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    margin-left: 15px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
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
