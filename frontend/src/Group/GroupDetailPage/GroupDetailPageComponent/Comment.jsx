const Comment = ({
  groupQnaAnswerContents,
  groupQnaAnswerDate,
  groupQnaAnswerLikeCnt,
  groupQnaAnswerLike,
  userName,
  groupQnaAnswerPk,
}) => {
    console.log(groupQnaAnswerLikeCnt)
  return (
    <div>
      {userName}
      {groupQnaAnswerLikeCnt}
      {groupQnaAnswerContents}
      {groupQnaAnswerDate}
    </div>
  );
};

export default Comment;
