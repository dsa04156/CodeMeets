import { useEffect, useState } from 'react';
import axios from 'axios';

import { useRecoilValue } from 'recoil';
import { APIroot, conference } from '../../Store';
import QuestionCard from './QuestionCard';

const QuestionBoard = () => {
  const API = useRecoilValue(APIroot);
  const [question, setQuestion] = useState([]);
  const conferenceData = useRecoilValue(conference);

  useEffect(() => {
    const qList = setInterval(() => {
      axios({
        method: 'GET',
        url: `${API}/conferenceQna?conferencePk=${conferenceData.conferencePk}`,
        headers: {
          'Content-Type': 'application/json',
          AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      }).then((response) => {
        setQuestion(response.data);
      });
    }, 500);
    return () => clearInterval(qList);
  }, []);

  const questionList = question.map((item, index) => {
    return (
      <QuestionCard
        key={index}
        conferencePk={item.conferencePk}
        conferenceQuestionContents={item.conferenceQuestionContents}
        conferenceQuestionDate={item.conferenceQuestionDate}
        conferenceQuestionLikeCnt={item.conferenceQuestionLikeCnt}
        conferenceQuestionLiked={item.conferenceQuestionLiked}
        conferenceQuestionPk={item.conferenceQuestionPk}
        conferenceQuestionUpdate={item.conferenceQuestionUpdate}
        conferenceTitle={item.conferenceTitle}
        userPk={item.userPk}
        groupPk={item.groupPk}
        username={item.username}
      />
    );
  });

  return <div>{questionList}</div>;
};

export default QuestionBoard;
