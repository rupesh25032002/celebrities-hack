import "./index.css";
import Celebrities from "./Component/Celebrities";
import { useGetData } from "./context/CelebritiesData";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import DeleteDialog from "./Component/DeleteDialog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { allData, setAllData, originalData, dialogPopUp } = useGetData();
  const [serachVal, setSearchVal] = useState();

  //search the celebrities
  const searchCelebrities = () => {
    if (serachVal !== "") {
      let newArr = [...originalData];
      newArr = newArr.filter((val) => {
        return val.first.includes(serachVal) || val.last.includes(serachVal);
      });
      setAllData(newArr);
    } else {
      setAllData(originalData);
    }
  };

  useEffect(() => {
    searchCelebrities();
  }, [serachVal]);

  return (
    <>
      <Wrapper>
        <h1 className="heading">LIST OF WORLD MOST FAMOUS CELEBRITIES</h1>
        <div className="container">
          <div className="search-container">
            <input
              type="text"
              value={serachVal}
              placeholder="Search"
              onChange={(e) => {
                setSearchVal(e.target.value);
              }}
            />
          </div>
          <div className="all-celebrities">
            <ul>
              {allData?.map((val, index) => {
                return (
                  <li>
                    <Celebrities val={val} index={index} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Wrapper>
      {dialogPopUp ? (
        <DeleteBox className="deletebox">
          <DeleteDialog />
        </DeleteBox>
      ) : null}
      <ToastContainer />
    </>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .heading {
    text-align: center;
    margin: 20px 0px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .container {
    padding: 20px;
    width: 60vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid #d7d3d3;
  }

  .search-container {
    border: 2px solid #d7d3d3;
    border-radius: 5px;
    padding: 5px;
    margin-top: 30px;
    margin-bottom: 20px;
    width: 100%;
  }
  input {
    font-size: 1.2em;
    text-indent: 5px;
    border: none;
    width: 100%;
    font-family: "Poppins", sans-serif;
    &:focus {
      outline: none;
    }
  }

  .all-celebrities {
    width: 100%;

    ul li {
      list-style: none;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 992px) {
    font-size: 15px;
    .container {
      width: 80vw;
    }
  }
  @media (max-width: 576px) {
    font-size: 13px;
    .container {
      width: 90vw;
    }
    input {
      font-size: 0.9em;
      width: 80%;
    }
  }
`;

const DeleteBox = styled.div`
  position: fixed;
  top: 0px;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 111;
`;
