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
  border: 2px solid grey;
  border-radius: 10px;
  padding:"4px";
  height: 60vh;
  overflow-y: scroll;
  background-color: #ffffff;
  &::-webkit-scrollbar {
  display: none;
}
`;
