import styled from "styled-components";

const CommentContentStyle = ({Content, Like}) => {
    return (
        <div>
        <ContentBox>
        {Content}
        </ContentBox>
<LikeBox>좋아요: {Like}</LikeBox>
        </div>
    );
};

export default CommentContentStyle;

const ContentBox = styled.div`
  border: 1px solid black;
  margin: 2vh;
  margin-Bottom: 1vh;
  height: 30vh;
`;

const LikeBox = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 3vh;
`;