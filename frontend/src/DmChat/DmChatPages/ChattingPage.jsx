import styled from "styled-components";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useRecoilValue } from "recoil";
import { APIroot } from "../../Store";
import { user } from "../../Store";

const ChattingPage = (props) => {
    const API = useRecoilValue(APIroot);
    const USER = useRecoilValue(user);
    const scrollRef = useRef();

    const [room, setRoom] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // console.log(USER);
        getMessage();
        console.log("scroll down");
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;   
    }, [API]);

    const getMessage = async () => {
        await axios({
            method: "GET",
            url: `http://localhost:18081/api/message/messagecontentlist?room=${props.room}`,
            headers: {
                "Content-Type": "application/json",
                AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
            },
            }).then((response) => {
                // console.log(response.data)
                setRoom(response.data);
            }); 
    }

    const chatUlList = room.map((roomItem, index) => {
        return (
                roomItem.recvPk !== USER.userPk
                ? <RightChat> {roomItem.content} </RightChat>
                : <LeftChat> {roomItem.content} </LeftChat>
        );
    });
    
    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleClick = () => {
        const otherPk = room[0].recvPk !== USER.userPk ? room[0].recvPk : room[0].sendPk;

        axios({
            method: "POST",
            url: `http://localhost:18081/api/message/send?room=${props.room}&otherPk=${otherPk}&content=${message}`,
            headers: {
                "Content-Type": "application/json",
                AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
            },
            }).then((response) => {
                getMessage();
            });
        setMessage('');
    }
    
    return (
        <ChatRoom>
            <ChattingList ref = {scrollRef}>
                {chatUlList}     
            </ChattingList>
            <SendMessage>
                <InputMessage>
                    <input
                    type="text"
                    name="message"
                    placeholder="보낼 메시지 입력"                    
                    value={message}
                    onChange={handleChange}
                    />
                </InputMessage>
                <SendButton>
                    <button onClick={handleClick}>확인</button>
                </SendButton>
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
  overflow: scroll;
  font-size: 24px;
`;

const LeftChat = styled.div`
    width: 100%;
    height: 3pem;
    text-align: left;
`;

const RightChat = styled.div`
    width: 100%;
    height: 3pem;
    text-align: right;
`;

const SendMessage = styled.div`
    width: 100%;
    height: 15%;
    border: 1px solid black;
    display: flex;
`;

const InputMessage = styled.div`
    width: 85%;
    height: 100%;
    border: 1px solid black;
`;

const SendButton = styled.div`
    width: 15%;
    height: 100%;
    border: 1px solid black;
`;