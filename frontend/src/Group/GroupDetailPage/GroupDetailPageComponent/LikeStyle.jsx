import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { useState } from 'react';
import axios from "axios";
import { APIroot } from "../../../Store";
import { useRecoilValue } from "recoil";

const LikeStyle = ({Like, groupQuestionPk, userPk}) => {

    const API = useRecoilValue(APIroot)

    // const [likeUnLike, setLikeUnLike] = useState(false);
    // const [myLikeState, setMyLikeState] = useState();

    // const likeClickHandler = () => {
    //     axios({
    //         method: "PUT",
    //         url: `${API}/qna/like`,
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         data: JSON.stringify({
    //             groupQuestionPk: groupQuestionPk,
    //             userPk: userPk,
    //         })
    //     }).then((response) => {
    //         console.log(response.data);
    //         if (response.data === 'success'){
    //             setLikeUnLike(!likeUnLike)
    //             setMyLikeState(response.data.groupQuestionLike)
    //         }
    //     })
    // }

    return (
        <div>
            <LikeBox>
                {/* 모르겠음. 안됨. 도저히 모르겠음. */}
                {/* <div onClick={likeClickHandler}>
                    {(likeUnLike === true) || (myLikeState === 1) ? <AiFillHeart style={{margin: '0px 5px 0px 0px'}}/> : <AiOutlineHeart style={{margin: '0px 5px 0px 0px'}}/>}
                    좋아요 : {Like}
                </div> */}
            </LikeBox>
        </div>
    );
};

export default LikeStyle;

const LikeBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
    font-size: 2vh;
    margin-right: 3vh;
`;