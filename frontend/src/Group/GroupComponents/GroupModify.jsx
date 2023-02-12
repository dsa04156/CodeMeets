import { useRecoilValue } from "recoil";
import { APIroot } from "../../Store"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const GroupModify = () => {
    const API = useRecoilValue(APIroot)
    const location = useLocation()
    const navigate = useNavigate()
    const firstData = location.state
    const [formTitle, setFormTitle] = useState(firstData.title)
    const [formContent, setFormContent] = useState(firstData.content)

    const titleHandler = (e) => {
        const currentTitle = e.target.value;
        setFormTitle(currentTitle)
    };
    
    const contentHandler = (e) => {
        const currentContent = e.target.value;
        setFormContent(currentContent)
    };

    const backHandler = () => {
        navigate(-1)
    }

    const submitHandler = (e) => {
        e.preventDefault()
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
            <form>
                <label htmlFor="">제목</label>
                <input type="text" defaultValue={`${formTitle}`} onChange={titleHandler}/>
                <label htmlFor="">content</label>
                <input type="text" defaultValue={`${formContent}`} onChange={contentHandler}/>
                <button type="submit" onClick={submitHandler}>제출</button>
            </form>
            <button onClick={backHandler}>뒤로</button>
        </div>
    );
};

export default GroupModify;