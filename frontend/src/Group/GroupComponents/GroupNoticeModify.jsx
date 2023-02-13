import { useRecoilValue } from "recoil";
import { APIroot } from "../../Store"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const GroupNoticeModify = () => {
    const API = useRecoilValue(APIroot)
    const location = useLocation()
    const navigate = useNavigate()
    const firstData = location.state
    const [formTitle, setFormTitle] = useState(firstData.title)
    const [formContent, setFormContent] = useState(firstData.content)

    const titleHandler = (event) => {
        const currentTitle = event.target.value;
        setFormTitle(currentTitle)
    };
    
    const contentHandler = (event) => {
        const currentContent = event.target.value;
        setFormContent(currentContent)
    };

    const backHandler = () => {
        navigate(-1)
    }

    // 수정
    const submitHandler = (event) => {
        event.preventDefault()
        console.log(formTitle)
        console.log(firstData.noticePk)
        console.log(formContent)
        axios({
            method:"PUT",
            url:`${API}/group-notice`,
            headers:{
                "Content-Type": "application/json"
            },
            data:JSON.stringify({
                groupNoticeTitle: `${formTitle}`,
                groupNoticePk: `${firstData.noticePk}`,
                groupNoticeContents:`${formContent}`,
                originFilename:"",
                dbFilename:""
            })
        }).then(() => {
            navigate(-1);
        })
        .catch((err) => {console.log(err)})
    };

    return (
        <div>
            <h3>수정 페이지</h3>
            <div><input type="text" defaultValue={`${formTitle}`} onChange={titleHandler} style={{width:'900px', height:'30px'}}/></div> 
            <div><textarea type="text" defaultValue={`${formContent}`} onChange={contentHandler} style={{width:'900px', height:'400px'}}/></div>
            <button onClick={submitHandler}>Registration</button>
            <button onClick={backHandler}>Cancel</button>
            
        </div>
    );
};

export default GroupNoticeModify;