import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import CelebritiesData from "../celebrities.json";
//create context
const contextApi = createContext();

//provider
const MyProvider = ({ children }) => {
const [allData, setAllData] = useState([]);
const [originalData, setOriginalData] = useState([]);
const [dialogPopUp, setDialogPopUp] = useState(false);
const [deleteId, setDeleteId] = useState();

  //set all data initially
  useEffect(() => {
    setAllData(CelebritiesData);
    setOriginalData(CelebritiesData);
  }, []);

  return (
    <contextApi.Provider
      value={{
        allData,
        setAllData,
        dialogPopUp,
        setDialogPopUp,
        deleteId,
        setDeleteId,
        originalData,
        setOriginalData,
      }}
    >
      {children}
    </contextApi.Provider>
  );
};

//consumer (cutsom hook)
const useGetData = () => {
  return useContext(contextApi);
};

export { contextApi, MyProvider, useGetData };
