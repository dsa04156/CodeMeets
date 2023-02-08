import styled from "styled-components";

const LikeStyle = ({Like}) => {
    return (
        <div>
            <LikeBox>
                좋아요 : {Like}
            </LikeBox>
        </div>
    );
};

export default LikeStyle;

const LikeBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 2vh;
    margin-right: 3vh;
`;