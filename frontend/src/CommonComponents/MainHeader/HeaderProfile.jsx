import DefaultImage from "../../Images/Logo.png"

import { user, APIroot } from "../../Store";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

import styled from "styled-components";

const HeaderProfile = () => {
    const loginUser = useRecoilValue(user);
    const API = useRecoilValue(APIroot)
    const [profileImage, setProfileImage] = useState("")
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
            <ProfileStyle src={`${profileImage}`} alt="" />
        </div>
    );
};

export default HeaderProfile;

const ProfileStyle = styled.img`
    height: 40px;
`;