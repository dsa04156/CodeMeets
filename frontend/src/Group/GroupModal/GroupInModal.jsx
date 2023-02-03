
// 보이는화면
import styled from "styled-components";
import Modal from "../../CommonComponents/Modal/Modal";

import { useState } from "react";
import axios from "axios";

import {APIroot} from "../../Store"
import { useRecoilValue } from "recoil";

const GroupInModal = ({ onClose }) => {
  const Title = "Group 가입";
  
  const API = useRecoilValue(APIroot)

  // 가입 url 넣기 위한 useState
  const [url,seturl] = useState("")
  const InputUrl = (e) => {
    const CurrentUrl = e.target.value;
    seturl(CurrentUrl);
  }

  // Modal에 내려줄 function -> 나중에 형이 만들더라도 이름을 맞춰서 넣어줘야 submit했을시 작동 가능
  const submitHandler = (e) => {
    e.preventDefault()
    console.log(url)
    axios({
        method: "POST",
        url: `${API}/group/join/${url}`,
        headers:{
            "Content-Type": "application/json",
            ACCESS_TOKEN: `${localStorage.getItem("ACCESS_TOKEN")}`
        }
    }).catch((err) => console.log(err))
  };

  return (
    // ModalTitle: 모달상단 제목, submitHandler: 제출시 작동할 함수, buttonName: Modal의 button부분 이름
    // 키(submitHandler, buttonName) 값을 같게 보내야 받을 수 있음!!!!!!!! 
    <Modal onClose={onClose} ModalTitle={Title} submitHandler={submitHandler} buttonName="제출">
      <form>
        <div>
          <label>가입 url</label>
          <input type="text" onChange={InputUrl}/>
        </div>
      </form>
    </Modal>
  );
};

export default GroupInModal;
