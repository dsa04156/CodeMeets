import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const Pagination = ({ totalPosts, limit, page, setPage}) => {
  const numPages = Math.ceil(totalPosts / limit);
  const [currPage, setCurrPage] = useState(page);
  const [firstNum, setFirstNum] = useState(1)
  const [lastNum, setLastNum] = useState(1)
  const [buttonLength, setButtonLength] = useState(1)


  useEffect(()=>{
    setCurrPage(page)
  }, [page])

  useEffect(()=>{
        if(numPages<6){
      setButtonLength(numPages)
    }else if(firstNum+4 <= numPages){
      setButtonLength(5)
    }else{
      const changeBtNum = numPages%5
      setButtonLength(changeBtNum)
    }
  },[page, buttonLength, numPages, firstNum, lastNum])
  // let firstNum = currPage - (currPage % 5) + 1;
  // let lastNum = currPage - (currPage % 5) + 5;

  const onClickHandler = (i) => {
    setCurrPage(firstNum + i)
    setPage(firstNum+i)
  }

  const downHandler = () => {
    console.log("downHandler ------------------------------")
    const changeDwNum = firstNum-5
    setFirstNum(changeDwNum)
    console.log("firstnum", firstNum)
    if(firstNum+4 < numPages){
      setButtonLength(5)
      setLastNum(firstNum+4)
    }else{
      const changeBtNum = numPages%5
      setButtonLength(changeBtNum)
      setLastNum(firstNum+4)
    }
  }

  const upHandler = () => {
    const changeUPNum = firstNum+5
    console.log("up Handler ---------------------------")
    setFirstNum(changeUPNum)
    console.log("firstnum",firstNum)
    if(firstNum+4 < numPages){
      setButtonLength(5)
      setLastNum(firstNum+4)
    }else{
      const changeBtNum = numPages%5
      setButtonLength(changeBtNum)
      setLastNum(firstNum+4)
    }
  }



  return (
    <ButtonLocation>
      <ButtonFooter>
        <button
          onClick={() => {
            downHandler()
            // setPage(page - 1);
            // setCurrPage(page - 2);
          }}
          disabled={firstNum === 1}
        >
          &lt;
        </button>
        {Array(buttonLength)
          .fill()
          .map((_, i) => {
            // if (i <= 3) {
              return (
                <button
                  border="true"
                  key={i + 1}
                  onClick={() => onClickHandler(i)}
                  // onClick={() => {
                  //   setPage(firstNum + i);
                  // }}
                  aria-current={page === firstNum + i ? "page" : null}
                >
                  {firstNum + i}
                </button>
              );
          })}
        <button
          onClick={() => {
            upHandler()
            // setPage(page + 5);
            // setCurrPage(page+4);
          }}
          disabled={firstNum+4 >= numPages-1}
        >
          &gt;
        </button>
      </ButtonFooter>
    </ButtonLocation>
  );
};

export default Pagination;

const ButtonFooter = styled.div`
  position: fixed;
  bottom: 8vh;
`;

const ButtonLocation = styled.div`
  display: flex;
  justify-content: center;
`;
