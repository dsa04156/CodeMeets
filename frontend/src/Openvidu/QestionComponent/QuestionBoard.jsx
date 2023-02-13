import { useEffect, useState } from "react";
import axios from "axios";

import { useRecoilValue } from "recoil";
import { APIroot } from "../../Store";

const QuestionBoard = () => {
  const API = useRecoilValue(APIroot);
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    const qList = setInterval(() => {
      axios({
        method: "GET",
        url: `${API}/conferenceQna?conferencePk=103`,
        headers: {
          "Content-Type": "application/json",
          AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      }).then((response) => {
        console.log(response.data);
        console.log(response.data[0].conferenceQuestionContents);
        setQuestion(response.data);
      })
    }, 100000);
    return () => clearInterval(qList);
  }, []);

  const questionList = question.map((item, index) => {
    console.log(item)
    return <div key={index}>{item.conferenceQuestionContents}</div>;
  });

  return <div>
    {questionList}
    </div>;
};

export default QuestionBoard;
