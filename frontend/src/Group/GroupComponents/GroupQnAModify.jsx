import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { APIroot } from "../../Store"

const GroupQnAModify = () => {
    const API = useRecoilValue(APIroot)
    const location = useLocation()
    const navigate = useNavigate()
    const firstData = location.state
    const [formTitle, setFormTitle] = useState(firstData.title)
    const [formContent, setFormContent] = useState(firstData.content)

    console.log(firstData)
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

    const submitHandler = (event) => {
        event.preventDefault()
        console.log(formTitle)
        console.log(firstData.questionPk)
        console.log(formContent)
        axios({
            method: "PUT",
            url: `${API}/qna`,
            headers:{
                "Content-Type": "application/json"
            },
            data:JSON.stringify({
                groupPk: "",
                groupQuestionAnswerCnt: "",
                groupQuestionDate: "",
                groupQuestionLike: "",
                groupQuestionLikeCnt: "",
                groupQuestionUpdate: "",
                username: "",
                userPk: "",
                groupQuestionTitle: `${formTitle}`,
                groupQuestionContents: `${formContent}`,
                groupQuestionPk: `${firstData.questionPk}`,
                total: "",
            })
        })
        .then(() => {
            navigate(-1);
        })
    };

    return (
        <div>
            <h3>Q&A 수정 페이지</h3>
            <div><input type="text" defaultValue={`${formTitle}`} onChange={titleHandler} style={{width:'900px', height:'30px'}}/></div> 
            <div><textarea type="text" defaultValue={`${formContent}`} onChange={contentHandler} style={{width:'900px', height:'400px'}}/></div>
            <button onClick={submitHandler}>Registration</button>
            <button onClick={backHandler}>Cancel</button>
        </div>
    );
};

export default GroupQnAModify;