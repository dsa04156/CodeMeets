import styled from 'styled-components';
import logoBlack from '../../assets/logo-black.png';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { useRecoilValue } from 'recoil';
import { APIroot } from '../../Store';
import { user } from '../../Store';

const ChattingPage = (props) => {
  const API = useRecoilValue(APIroot);
  const USER = useRecoilValue(user);
  const scrollRef = useRef();

  const [room, setRoom] = useState([]);
  const [message, setMessage] = useState('');
  const [myProfileImage, setMyProfileImage] = useState('');
  const ws = useRef({});

  useEffect(() => {
    // prod 환경
    ws.current = new WebSocket(
      `wss://i8d109.p.ssafy.io/api/chating/${props.room}`
    );
    // dev 환경
    // ws.current = new WebSocket(`wss://localhost:18081/api/chating/${props.room}`);
    getMessage();

    if (USER.profilePhoto === '') {
      setMyProfileImage(logoBlack);
    } else {
      setMyProfileImage(`${API}/file/images/${USER.profilePhoto}`);
    }

    return () => {
      ws.current.close();
    };
  }, [API]);

  useEffect(() => {
    ws.current.onmessage = (readMsg) => {
      const dataSet = JSON.parse(readMsg.data);
      setRoom([...room, dataSet]);
      props.changeContents(dataSet.content);
    };

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [room]);

  const getMessage = async () => {
    await axios({
      method: 'GET',
      url: `${API}/message/messagecontentlist?room=${props.room}`,
      headers: {
        'Content-Type': 'application/json',
        AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    }).then((response) => {
      setRoom(response.data);
    });
  };

  const chatUlList = room.map((roomItem, index) => {
    return roomItem.recvPk !== USER.userPk ? (
      // 자신의 메시지
      <RightChat>
        <ProfileArea>
          {USER.nickname} &nbsp;
          {roomItem.profilePhoto.includes('http') ? (
            // 소셜로그인하고 프로필 사진 변경한적 없는 경우
            <ProfileStyle src={`${roomItem.profilePhoto}`} />
          ) : (
            // 사진 이미지를 업로드 하여 사용중인 경우
            <ProfileStyle src={`${API}/file/images/${roomItem.profilePhoto}`} />
          )}
        </ProfileArea>
        <MessageStyle> {roomItem.content} </MessageStyle>
      </RightChat>
    ) : (
      // 상대의 메시지
      <LeftChat>
        <ProfileArea>
          {/* 프로필 사진이 없는 경우 */}
          {roomItem.profilePhoto === '' ? (
            <ProfileStyle src={logoBlack} />
          ) : // 프로필 사진은 있는데 ...
          roomItem.profilePhoto.includes('http') ? (
            // 소셜로그인하고 프로필 사진 변경한적 없는 경우
            <ProfileStyle src={`${roomItem.profilePhoto}`} />
          ) : (
            // 사진 이미지를 업로드 하여 사용중인 경우
            <ProfileStyle src={`${API}/file/images/${roomItem.profilePhoto}`} />
          )}
          &nbsp; {props.otherNick}
        </ProfileArea>
        <MessageStyle> {roomItem.content} </MessageStyle>
      </LeftChat>
    );
  });

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    if (message != '') {
      axios({
        method: 'POST',
        url:
          `${API}/message/send?room=${props.room}&otherPk=${props.other}&content=` +
          encodeURI(message),
        // url: `http://localhost:18081/api/message/send?room=${props.room}&otherPk=${props.other}&content=` + encodeURI(message),
        headers: {
          'Content-Type': 'application/json',
          AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      }).then((response) => {
        props.changeContents(message);
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      });

      send();
      setMessage('');
    }
  };

  const send = () => {
    let data = {};

    data.id = USER.userPk;
    data.content = message;
    data.profilePhoto = USER.profilePhoto;
    data.sendPk = USER.userPk;
    data.room = props.room;
    data.recvPk = props.other;
    var temp = JSON.stringify(data);
    ws.current.send(temp);
  };

  return (
    <ChatRoom>
      <ChattingList ref={scrollRef}>{chatUlList}</ChattingList>
      <SendMessage>
        <TextArea
          className="form-control"
          maxLength={400}
          autoFocus
          value={message}
          onChange={handleChange}
          placeholder="Enter로 전송"
          onKeyPress={(event) => {
            if (event.code === 'Enter') {
              event.preventDefault();
              handleClick();
            }
          }}
        />
        <SendButton onClick={handleClick}>확인</SendButton>
      </SendMessage>
    </ChatRoom>
  );
};

export default ChattingPage;

const ChatRoom = styled.div`
  width: 100%;
  height: 100%;
`;

const ChattingList = styled.div`
  width: 100%;
  height: 85%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProfileStyle = styled.img`
  height: 30px;
  border-radius: 70%;
  overflow: hidden;
`;

const LeftChat = styled.div`
  width: 100%;
  text-align: left;
  margin: 5px 0 5px 0;
`;

const RightChat = styled.div`
  width: 100%;
  text-align: right;
  margin: 5px 0 5px 0;
`;

const ProfileArea = styled.div`
  font-size: 15px;
`;

const MessageStyle = styled.div`
  font-size: 25px;
  padding: 0 15px 0 15px;
`;

const SendMessage = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
`;

const TextArea = styled.textarea`
  resize: none;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
  width: 85%;
  height: 90%;
  margin: 0 0 3px;
  margin-left: 5px;
`;

const SendButton = styled.button`
  width: 15%;
  height: 95%;
  border: 1px solid black;
  border-radius: 10%;
`;
