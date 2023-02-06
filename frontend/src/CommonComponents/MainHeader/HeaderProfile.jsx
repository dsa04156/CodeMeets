import DefaultImage from "../../Images/Logo.png"

import { user, APIroot } from "../../Store";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderProfile = () => {
    const loginUser = useRecoilValue(user);
    const API = useRecoilValue(APIroot);
    const [profileImage, setProfileImage] = useState("");
    const navigate = useNavigate();

    const ToMyPage = () => {
        navigate(`/my-page/${loginUser.userPk}/meeting-list`)
    }
    
    useEffect(()=>{
        console.log(loginUser)
        if(loginUser.profilePhoto === ""){
            setProfileImage(DefaultImage)
        }else{
            setProfileImage(`${API}/file/images/${loginUser.profilePhoto}`)
        }
    },[loginUser])


    return (
        <div>
            <ProfileStyle src={`${profileImage}`} onClick={ToMyPage}/>
        </div>
    );
};

export default HeaderProfile;

const ProfileStyle = styled.img`
    height: 40px;
    cursor: pointer;;
`;