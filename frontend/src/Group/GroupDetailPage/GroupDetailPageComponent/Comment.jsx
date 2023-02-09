const Comment = ({
  conferenceAnswerContents,
  conferenceAnswerDate,
  conferenceAnswerLikeCnt,
  groupQnaAnswerLike,
  conferenceAnswerLike,
  username,
  conferenceAnswerPk,
}) => {
  console.log(username);
  return (
    <div>
      {username}
      {conferenceAnswerLikeCnt}
      {conferenceAnswerContents}
      {conferenceAnswerDate}
    </div>
  );
};

export default Comment;
