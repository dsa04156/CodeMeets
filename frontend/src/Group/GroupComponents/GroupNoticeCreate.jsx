// {
//   "dbFilename": "string",
//   "groupNoticeContents": "string",
//   "groupNoticeTitle": "string",
//   "groupPk": 0,           
//   "originFilename": "string",
//   "total": 0,
//   "userName": "string",  -> loginUser.userName
//   "userPk": 0  -> loginUser.usePk
// }

import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { APIroot, user } from "../../Store";

const GroupNoticeCreate = () => {
    
    const [noticeTitle, setNoticeTitle] = useState();
    const [noticeContent, setNoticeContent] = useState();

    const loginUser = useRecoilValue(user);
    const API = useRecoilValue(APIroot);
    const navigate = useNavigate();
    const params = useParams();
    const groupPk = params.group_pk;

    // console.log(groupPk);
  const writeTitleHandler = (event) => {
    setNoticeTitle(event.target.value);
  }

  const writeContentHandler = (event) => {
    setNoticeContent(event.target.value);
  }

  console.log(noticeContent);
  console.log(noticeTitle);
  console.log(groupPk);
  console.log(loginUser.userPk);
  // 글 작성
  const registrationHandler = () => {
    axios({
        method: "POST",
        url: `${API}/group-notice`,
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
            dbFilename: '',
            groupNoticeContents: noticeContent,
            groupNoticeTitle: noticeTitle,
            groupPk: groupPk,
            originFilename: '',
            userName: loginUser.userName,
            userPk: loginUser.userPk,
            groupNoticeDate: '',
            groupNoticeHit: '',
            groupNoticePk: '',
        })
    }).then((response) => {
        console.log(response.data)
        navigate(-1)
    })
  }

  const cancelHandler = () => {
    navigate(-1)
  }
    return (
        <div>
            <h3>글쓰기 페이지</h3>
            <div><input type="text" placeholder="제목을 입력해주세요." onChange={writeTitleHandler} style={{width:'900px', height:'30px'}} /></div>
            <div>
            <textarea placeholder="내용을 입력하세요" onChange={writeContentHandler} style={{width:'900px', height:'400px'}}></textarea>
            </div>
            <div><button onClick={registrationHandler}>Registration</button></div>
            <div><button onClick={cancelHandler}>Cancel</button></div>
        </div>

    );
};

export default GroupNoticeCreate;