const GroupQnAComment = ({
    groupQnaAnswerContents,
    groupQnaAnswerDate,
    groupQnaAnswerLikeCnt,
    groupQnaAnswerLike,
    username,
    groupQnaAnswerPk,
  }) => {
    // console.log(username);
    // console.log(groupQnaAnswerContents);
    // console.log(groupQnaAnswerDate);
    // console.log(groupQnaAnswerLikeCnt);
    // console.log(groupQnaAnswerLike);
    // console.log(groupQnaAnswerPk);
    return (
      <div>
        {username}
        {groupQnaAnswerLikeCnt}
        {groupQnaAnswerContents}
        {groupQnaAnswerDate}
      </div>
    );
  };
  
  export default GroupQnAComment;