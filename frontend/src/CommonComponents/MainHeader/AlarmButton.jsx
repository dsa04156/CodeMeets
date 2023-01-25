import { AiOutlineBell } from "react-icons/ai";

const AlarmButton = () => {

    const AlarmButtonHandler = () => {
        console.log('alarm')
    };

    return (
            <AiOutlineBell onClick={AlarmButtonHandler} size="20" style={{marginRight:"20px", cursor:'pointer'}} />
    );

};

export default AlarmButton;