import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Pagination = ({ totalPosts, limit, page, setPage }) => {
  const numPages = Math.ceil(totalPosts / limit);
  const [currPage, setCurrPage] = useState(page);
  const [firstNum, setFirstNum] = useState(1);
  const [lastNum, setLastNum] = useState(1);
  const [buttonLength, setButtonLength] = useState(1);

  useEffect(() => {
    setCurrPage(page);
  }, [page]);

  useEffect(() => {
    if (numPages < 6) {
      setButtonLength(numPages);
    } else if (firstNum + 4 <= numPages) {
      setButtonLength(5);
    } else {
      const changeBtNum = numPages % 5;
      setButtonLength(changeBtNum);
    }
  }, [page, buttonLength, numPages, firstNum, lastNum]);

  const onClickHandler = (i) => {
    setCurrPage(firstNum + i);
    setPage(firstNum + i);
  };

  const downHandler = () => {
    const changeDwNum = firstNum - 5;
    setFirstNum(changeDwNum);
    if (firstNum + 4 < numPages) {
      setButtonLength(5);
      setLastNum(firstNum + 4);
    } else {
      const changeBtNum = numPages % 5;
      setButtonLength(changeBtNum);
      setLastNum(firstNum + 4);
    }
  };

  const upHandler = () => {
    const changeUPNum = firstNum + 5;
    setFirstNum(changeUPNum);
    if (firstNum + 4 < numPages) {
      setButtonLength(5);
      setLastNum(firstNum + 4);
    } else {
      const changeBtNum = numPages % 5;
      setButtonLength(changeBtNum);
      setLastNum(firstNum + 4);
    }
  };
  return (
    <ButtonLocation>
      <ButtonFooter>
        <button
          className="button"
          onClick={() => {
            downHandler();
          }}
          disabled={firstNum === 1}
        >
          &lt;
        </button>
        {Array(buttonLength)
          .fill()
          .map((_, i) => {
            return (
              <button
              className="button"
                border="true"
                key={i + 1}
                onClick={() => onClickHandler(i)}
                aria-current={page === firstNum + i ? 'page' : null}
              >
                {firstNum + i}
              </button>
            );
          })}
        <button
          className="button"
          onClick={() => {
            upHandler();
          }}
          disabled={firstNum + 4 >= numPages - 1}
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
  button {
    border-radius: 5px;
    margin-left: 2px;
    margin-right: 2px;
    cursor: pointer;
  }
  .button:hover,
  .button.active {
    background: #7ea338;
    color: white;
  }
  .button {
    border: 0;
  }
`;

const ButtonLocation = styled.div`
  display: flex;
  justify-content: center;
`;
