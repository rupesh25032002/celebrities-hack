import React from "react";
import styled from "styled-components";
import { useGetData } from "../context/CelebritiesData";
const DeleteDialog = () => {
  const {
    allData,
    setAllData,
    setDialogPopUp,
    deleteId,
    originalData,
    setOriginalData,
  } = useGetData();

  //delete Item from the list
  const deleteItem = () => {
    let newarr = [...allData];
    const updateArr = newarr.filter((val) => val.id !== deleteId);
    const newOriginal=originalData.filter((val)=>val.id !== deleteId);
    setOriginalData(newOriginal);
    setAllData(updateArr);
    setDialogPopUp(false);
  };
  return (
    <Wrapper>
      <h3>Are you sure want to delete?</h3>
      <div className="btn-container">
        <button className="btn" onClick={() => setDialogPopUp(false)}>
          CANCEL
        </button>
        <button className="btn delete-btn" onClick={() => deleteItem()}>
          DELETE
        </button>
      </div>
    </Wrapper>
  );
};

export default DeleteDialog;
const Wrapper = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  border: 2px solid #e1e1e1;
  border-radius: 5px;
  padding: 20px;
  background-color: white;

  h1,
  .btn-container {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .btn-container {
    display: flex;
    justify-content: flex-end;
  }
  .btn {
    margin: 5px 10px;
    padding: 5px 10px;
    border: 1px solid;
    border-radius: 5px;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    letter-spacing: 2px;
    background-color: white;
  }

  .delete-btn {
    background-color: #fb3f0b;
    border: 2px solid #fb3f0b;
    color: white;
  }

  @media (max-width: 700px) {
    width: 90vw;
  }
`;
