import { useParams } from "react-router-dom";

import GroupMemberItem from "../GroupComponents/GroupMemberItem";
import MemberCard from "../GroupComponents/MemberCard";

import DefaultImage from "../../Images/Logo.png";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

import { APIroot } from "../../Store";
import { useRecoilValue } from "recoil";

const GroupMember = () => {
  const API = useRecoilValue(APIroot);

  const params = useParams();
  console.log(params);
  const [userList,setUserList] = useState([])
  // const [managerList, setManagerList] = useState([]);
  // const [nomalList, setNomalList] = useState([]);
  const [position, setPosition] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      url: `${API}/group/${params.group_pk}/member`,
      headers: {
        "Content-Type": "application/json",
        AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    }).then((response) => {
      console.log(response.data);
      // setNomalList(response.data.Nomal);
        setUserList(response.data.List);
        setPosition(response.data.position);
      }
    );
  }, [API, position]);


  const cardUserList = userList.map((useritem, index) => {
    console.log(useritem);
    return (
      <div>
        <MemberCard
          key={index}
          userName={useritem.userName}
          userId={useritem.userId}
          nickName={useritem.nickname}
          profilePhoto={
            useritem.profilePhoto != null ? useritem.profilePhoto : DefaultImage
          } // 일단 null -> ""
          tel={useritem.telPublic === "1" ? useritem.telPublic : null}
          email={useritem.emailPublic === "1" ? useritem.emailPublic : null}
          manager
          position = {position}
        />
      </div>
    );
  });


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
