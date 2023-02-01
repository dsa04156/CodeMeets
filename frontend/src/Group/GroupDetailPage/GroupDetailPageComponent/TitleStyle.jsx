import styled from "styled-components";

const TitleStyle = ({TitleContent}) => {
    return (
        <TitleBox>
            Title: {TitleContent}
        </TitleBox>
    );
};

export default TitleStyle;

const TitleBox = styled.div`
border: 1px solid black;
font-size: 5vh;
margin: 2vh;
`;