import { useRecoilValue } from "recoil";
import { APIroot, user } from "../../Store";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import TitleStyle from "./GroupDetailPageComponent/TitleStyle";
import ContentStyle from "./GroupDetailPageComponent/ContentStyle";
import HitStyle from "./GroupDetailPageComponent/HitStyle";
import { useNavigate } from "react-router-dom";

const GroupNoticeDetail = () => {
    const params = useParams()
    const API = useRecoilValue(APIroot)
    const loginUser = useRecoilValue(user)
    const [data, setData] = useState({})
    console.log(params)
    const navigate = useNavigate()
    console.log(loginUser)
    const ModifyHandler = () => {
        navigate("/group/notice/modify", {state:{title: data.groupNoticeTitle, content:data.groupNoticeContents, noticePk: data.groupNoticePk}})
    }

    const ToListHandler = () => {
        navigate(-1);
    }
    useEffect(()=>{
        axios({
            method: "GET",
            url:`${API}/group-notice/${params.notice_pk}`,
            headers:{
                "Content-Type": "application/json",
            }
        }).then((response)=>{
            console.log(response.data)
            setData(response.data)
        })
    },[API])

    // 삭제
    const deleteHandler = () => {
        axios({
            method: "DELETE",
            url: `${API}/group-notice?groupNoticePk=${params.notice_pk}`,
        })
        .then((response) => {
            navigate(-1);
        })
    }

    return (
        <div>
            <TitleStyle TitleContent={data.groupNoticeTitle} />
            <HitStyle Hit={data.groupNoticeHit} />
            <ContentStyle Content={data.groupNoticeContents} />
            { (data.userPk === loginUser.userPk)? <button onClick={ModifyHandler}>Modify</button> : null } {/* 로그인 userPk와 글쓴 사람의 userPk가 같을 경우 수정 버튼 보이게 */}
            <button onClick={ToListHandler}>Cancel</button>
            { (data.userPk === loginUser.userPk)? <button onClick={deleteHandler}>Delete</button> : null }
            {/* <button onClick={deleteHandler}>Delete</button> */}
        </div>
    );
};

export default GroupNoticeDetail;