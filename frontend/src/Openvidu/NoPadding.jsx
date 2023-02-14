import OpenViduMain from "./OpenViduMain";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { user, APIroot, conference } from "../Store";
import { useEffect } from "react";
import axios from "axios";

const NoPadding = () => {
    const loginUser = useRecoilValue(user)
    const API = useRecoilValue(APIroot)
    const location = useLocation();

    const [recoilConference, setRecoilConference] = useRecoilState(conference)

    console.log("-------location", location)    
    // sessionTitle={location.state.sessionTitle}
    useEffect(()=>{
        axios({
            method:"POST",
            url:`${API}/conference/enter?conferenceUrl=${location.state.meetingUrl.conferenceUrl}`,
            headers: {
                "Content-Type": "application/json",
                AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
              },
        }).then((response) => {
            console.log("-----------다 받아오나요오오오오오", response)
            setRecoilConference(response.data)
        })
    }, [])


    return(
        <OpenViduMain user={loginUser} meetingUrl={location.state.meetingUrl} />
    )
}

export default NoPadding;