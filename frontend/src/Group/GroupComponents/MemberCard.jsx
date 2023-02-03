import styled from "styled-components";

const MemberCard = ({ userId, nickName, profilePhoto, tel, email, userName, position }) => {
  return (
    <Card>
      <ImageBox>
        <ProfileImageStyle src={`${profilePhoto}`} alt="" />
      </ImageBox>
      <NameBox>
        <div>이름: {userName}</div>
        <div>아이디: {userId}</div>
        <div>닉네임: {nickName}</div>
      </NameBox>
      <PublickBox>
        <div>tel: {tel}</div>
        <div>email: {email}</div>
      </PublickBox>
      <button>매니저 승급!</button>
      {position === 1 ? <button>삭제</button> : null}
    </Card>
  );
};

export default MemberCard;

const Card = styled.div`
  display: flex;
  border: 1px solid black;
  height: 11vh;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 11vh;
  width: 15vh;
  border-right: 1px solid black;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vh;
  margin-left: 2vh;
  justify-content: space-around;
`;

const PublickBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vh;
  justify-content: space-around;
`;

const ProfileImageStyle = styled.img`
  height: 10vh;
`;
