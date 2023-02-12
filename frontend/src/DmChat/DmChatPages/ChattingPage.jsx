import styled from "styled-components";
import DefaultImage from "../../Images/Logo.png"

import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
// import io from "socket.io-client";

import { useRecoilValue } from "recoil";
import { APIroot } from "../../Store";
import { user } from "../../Store";

// const socket = io.connect("http://localhost:18081/api/message/chatt");

const ChattingPage = (props) => {
    const API = useRecoilValue(APIroot);
    const USER = useRecoilValue(user);
    const scrollRef = useRef();

    const [room, setRoom] = useState([]);
    const [message, setMessage] = useState('');
    const [myProfileImage, setMyProfileImage] = useState("");
    const [other, setOther] = useState("");
    // const ws = new WebSocket(`ws://localhost:18081/api/chating/${props.room}`);
    const ws = new WebSocket(`ws://localhost:18081/api/ws/chat`);
    // const [ws, setWs] = useState("");

    useEffect(() => {
        setOther(props.other);
        getMessage();
        
        if(USER.profilePhoto === ""){
            setMyProfileImage(DefaultImage)
        }else{
            setMyProfileImage(`${API}/file/images/${USER.profilePhoto}`)
        }

        // setWs(new WebSocket("ws://localhost:18081/api/message/chatt"));

        
    }, [API]);
    
    useEffect(() => {
        ws.onmessage = (readMsg) => {
            const dataSet = JSON.parse(readMsg.data);
            console.log("dataSet - " + dataSet);
            // setRoom(dataSet);
            setRoom([...room, dataSet]);
        }
        
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;   
    }, [room])


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
        // console.log(roomItem)
        return (
                roomItem.recvPk !== USER.userPk
                ?
                <RightChat>
                        <ProfileStyle src={`${myProfileImage}`} /> <br/>
                        <MessageStyle> {roomItem.content} </MessageStyle>
                </RightChat>
                :
                <LeftChat>
                    <ProfileStyle src={`${API}/file/images/${roomItem.profilePhoto}`} /> <br/>
                    <MessageStyle> {roomItem.content} </MessageStyle>
                </LeftChat>
        );
    });
    
    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleClick = () => {
        const otherPk = room[0].recvPk !== USER.userPk ? room[0].recvPk : room[0].sendPk;

        // axios({
        //     method: "POST",
        //     url: `http://localhost:18081/api/message/send?room=${props.room}&otherPk=${otherPk}&content=` + encodeURI(message),
        //     headers: {
        //         "Content-Type": "application/json",
        //         AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
        //     },
        //     }).then((response) => {
        //         // getMessage();
        //         scrollRef.current.scrollTop = scrollRef.current.scrollHeight;   
        //     });
        
        send();
        setMessage('');
    }

    const send = () => {
        let data = {};

        if (message != "") {
            data.id = USER.userPk;
            data.content = message;
            data.profilePhoto = USER.profilePhoto;
            // data.date = new Date().toLocaleString();
            data.sendPk = USER.userPk;
            data.recvPk = other;
            var temp = JSON.stringify(data);
            console.log("send " + temp);
            ws.send(temp);
        }
        console.log(ws);
    }
    
    return (
        <ChatRoom>
            <ChattingList ref = {scrollRef}>
                {chatUlList}     
            </ChattingList>
            <SendMessage>
                {/* <Inlabel htmlFor="msg">
                    </Inlabel> */}
                {/* <InputMessage
                    id="msg"
                    style={{ border: 'solid 2px grey', width: '85%', height: '100%', alignItems: 'top'}}
                    type="text"
                    name="message"
                    placeholder="보낼 메시지 입력"                    
                    value={message}
                    onChange={handleChange}
                    onKeyPress={event => {
                    if (event.code === "Enter") {
                        event.preventDefault();
                        handleClick();
                        }
                    }}
                    /> */}
                <textarea
                    className="form-control"
                    maxLength={400}
                    autoFocus               
                    value={message}
                    onChange={handleChange}
                    onKeyPress={event => {
                        if (event.code === "Enter") {
                            event.preventDefault();
                            handleClick();
                            }
                        }}
                />
                <SendButton onClick={handleClick}>
                    확인
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
`;

const ProfileStyle = styled.img`
    height: 40px;
    border-radius: 70%;
    overflow: hidden;
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

const MessageStyle = styled.div`
    font-size: 20px;
    padding: 0 15px 0 15px;
`;

const SendMessage = styled.div`
    width: 100%;
    height: 15%;
    border: 1px solid black;
    display: flex;
`;

const Inlabel = styled.label`
    border-radius:4px;
    display: inline-block;
    // padding: 10px 10px;
    color: #fff;
    vertical-align: middle;
    // background-color: #999999;
    width: 85%;
    height: 100%;
    margin: 0 0 3px;
    margin-left: 5px;
`

const InputMessage = styled.input`
    border: none;
    background: white;
    margin: 0 0 0 0;
    padding: 0 0 0 0;
`;

const SendButton = styled.button`
    width: 15%;
    height: 100%;
    border: 1px solid black;
`;