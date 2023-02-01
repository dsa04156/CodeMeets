import { useParams } from "react-router-dom";

import GroupMemberItem from "../GroupComponents/GroupMemberItem";
import MemberCard from "../GroupComponents/MemberCard";

import DefaultImage from "../../Images/Logo.png"
import styled from "styled-components";
import axios from "axios";
import { useEffect,useState } from "react";

import { APIroot } from "../../Store";
import { useRecoilValue } from "recoil";

const GroupMember = () => {
  const API = useRecoilValue(APIroot)

  const params = useParams();
  console.log(params);
  const [userList,setUserList] = useState([])

  useEffect(() => {
    axios({
      method:"GET",
      url:`${API}/group/${params.group_pk}/member`,
      headers:{
        "Content-Type": "application/json",
      }
    }).then((response) => {
      console.log(response.data)
      setUserList(response.data)
    })
  },[API])

  const cardUserList = userList.map((useritem, index)=>{
    console.log(useritem)
    return(
      <MemberCard 
      key={index}
      userName={useritem.userName}
      userId={useritem.userId}
      nickName={useritem.nickname}
      profilePhoto={useritem.profilePhoto != null? useritem.profilePhoto : DefaultImage} // 일단 null -> ""
      tel={useritem.telPublic==="1"? useritem.telPublic : null}
      email={useritem.emailPublic==="1"? useritem.emailPublic : null}
      />
    );
  })

  return (
    <MainBox>
      {cardUserList}
    </MainBox>
  );
};

export default GroupMember;

const MainBox = styled.div`
border: 1px solid red;
height: 63vh;
overflow: scroll;
`;
