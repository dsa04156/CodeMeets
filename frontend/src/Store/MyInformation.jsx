import {createContext, useState} from 'react';

// 이름
// 프로필
// 닉네임
// 아이디
// 전화번호
// 이메일

const MyInformation = createContext({
    myName:"",
    myProfile:"",
    myNickName:"",
    myId:"",
    myPhoneNumber:"",
    myEmail:""
}); 

const MyInformationProvier = () => {

};

export default MyInformationProvier;