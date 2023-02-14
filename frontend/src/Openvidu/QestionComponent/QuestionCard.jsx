import styled from "styled-components";
import {user} from "../../Store";
import { useRecoilValue } from "recoil";

const QuestionCard = (props) => {
    const loginUser = useRecoilValue(user)


  return (
    <CardStyle>
      <MainLine>
        <div>{props.username}</div>
        <div>{props.conferenceQuestionContents}</div>
        <LikeBox style={{ marginLeft: "1vh" }}>
          <div style={{display:"flex"}}>
            <div>{"★"}</div>
            <div style={{ marginLeft: "1vh" }}>
              {props.conferenceQuestionLiked}
            </div>
          </div>
          {loginUser.userPk === props.userPk ? <button>Delete</button> : null}
        </LikeBox>
      </MainLine>
    </CardStyle>
  );
};

export default QuestionCard;

const CardStyle = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 10px;
  background-color: rgb(142, 195, 176);
`;

const MainLine = styled.div`
width:45vh;
  display: flex;
  flex-direction: column;
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
