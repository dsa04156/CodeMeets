import styled from "styled-components";

const TitleStyle = ({TitleContent}) => {
    return (
        <div>
        <TitleBox>
            <div>
                Title: {TitleContent}
            </div>
        </TitleBox>
        </div>
    );
};

export default TitleStyle;

const TitleBox = styled.div`
border: 1px;
display: flex;
flex-direction: column;
font-size: 3vh;
margin: 2vh;
.LikeBox {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    /* margin-left: 80vh; */
  font-size: 2vh;
}
`;
