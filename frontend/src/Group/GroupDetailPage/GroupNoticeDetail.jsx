import { useRecoilValue } from "recoil";
import { APIroot } from "../../Store";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import TitleStyle from "./GroupDetailPageComponent/TitleStyle";
import ContentStyle from "./GroupDetailPageComponent/ContentStyle";

const GroupNoticeDetail = () => {
    const params = useParams()
    const API = useRecoilValue(APIroot)
    const [data, setData] = useState({})
    console.log(params)
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
    return (
        <div>
            <TitleStyle TitleContent={data.groupNoticeTitle}/>
            <ContentStyle Content={data.groupNoticeContents} Hit={data.groupNoticeHit}/>
        </div>
    );
};

export default GroupNoticeDetail;