import OpenViduMain from "./OpenViduMain";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "../Store";

const NoPadding = () => {
    const loginUser = useRecoilValue(user)
    const location = useLocation();
    console.log("-------location", location)    
    // sessionTitle={location.state.sessionTitle}
    

    return(
        <OpenViduMain user={loginUser} meetingUrl={location.state.meetingUrl}/>
    )
}

export default NoPadding;