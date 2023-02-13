import QuestionBoard from "./QuestionBoard";
import QuestionInput from "./QuestionInput";
import styled from "styled-components";

const QuestionPage = () => {
  return (
    <div>
      <QuestionBox>
        <QuestionBoard />
      </QuestionBox>
      <QuestionInput />
    </div>
  );
};

export default QuestionPage;

const QuestionBox = styled.div`
  border: 1px solid yellow;
  height: 60vh;
  overflow: scroll;
`;
