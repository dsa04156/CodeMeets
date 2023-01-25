import styled from "styled-components";
import Logo from "../../Images/Logo2.jpg"

const MyPageProfile = () => {
    return (
        <ProfileCard>
            <ProfileImage src={Logo} alt="" />
            <ProfileInformation>
                <p>여기 information</p>
            </ProfileInformation>
        </ProfileCard>
    );
};

export default MyPageProfile;

const ProfileCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    border-radius: 20px;
    height: 170px;
`;

const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-right: 1px solid black;
    padding-left: 10px;
    padding-right: 10px;
`;

const ProfileInformation = styled.div`
    width: 75%;
`;