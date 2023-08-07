import React, { useEffect } from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import {
  AiOutlineCheckCircle,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { useGetData } from "../context/CelebritiesData";
import { toast } from "react-toastify";

const Celebrities = ({ val, index }) => {
  const {
    allData,
    setAllData,
    setDialogPopUp,
    setDeleteId,
  } = useGetData();

  const [celebData, setCelebData] = useState({
    id: val?.id,
    first: val?.first,
    last: val?.last,
    picture: val?.picture,
    email: val?.email,
    dob: new Date().getFullYear() - new Date(val?.dob).getFullYear(),
    gender: val?.gender,
    country: val?.country,
    description: val?.description,
  });
  
  //initial data
  const [initialCelebData, setInitialCelebdata] = useState({
    id: "",
    first: "",
    last: "",
    picture: "",
    email: "",
    dob: "",
    gender: "",
    country: "",
    description: "",
  });
  //for open and close accordian
  const [dropIcon, setDropIcon] = useState(false);
  //edit enable
  const [editState, setEditState] = useState(false);
  //initially check icon is disable
  const [checkDisable, setCheckDisable] = useState(false);
  //get the date and month of celebrities
  const date = new Date(val?.dob).getDate();
  const month = new Date(val?.dob).getMonth() + 1;

  const { id, first, last, picture, dob, gender, country, description } =
  celebData;
  //getting name state
  const [name, setName] = useState(first + " " + last);

  // update the Celebrities state Data 
  const handleCelebData = (field, value) => {
    if (field !== "name") {
      setCelebData({
        ...celebData,
        [field]: value,
      });
    } else {
      setName(value);
      let nameValue = value?.split(" ");
      let first = nameValue[0];
      let last = nameValue?.splice(1)?.join(" ");
      setCelebData({
        ...celebData,
        first: first,
        last: last,
      });
    }

    //check button is enable when user edit something
    if (!checkDisable) setCheckDisable(true);
  };

  //if edit something then call setUpdateData
  const setUpdateData = (id) => {
    if (checkDisable) {
      //validations
      if (!/[0-9]{1,3}/.test(dob)) {
        toast.error("Enter valid Age", {
          autoClose: 1000,
        });
        return;
      }
      if (!/[a-zA-Z-]{2,20}/.test(country)) {
        toast.error("Enter valid Country name", {
          autoClose: 1000,
        });
        return;
      }
      if (first + last === "") {
        toast.error("Enter valid Name", {
          autoClose: 1000,
        });
        return;
      }
      if (description === "") {
        toast.error("Description is required", {
          autoClose: 1000,
        });
        return;
      }

      let newarr = [...allData];
      const updateIndex = newarr.findIndex((c) => c.id === id);
      //converting age in date of birth (yyyy-mm-dd)
      let newage;
      let newyear = new Date().getFullYear() - dob;
      newage = `${newyear}-${month}-${date}`;
      for (const key in newarr[updateIndex]) {
        if (key !== "dob") {
          newarr[updateIndex][key] = celebData[key];
        } else newarr[updateIndex][key] = newage;
      }
      setAllData(newarr);
      setInitialCelebdata({ ...initialCelebData, ...celebData });
      setEditState(false);
      setCheckDisable(false);
    }
  };

  //to delete the item in list
  const handleDelete = (id) => {
    setDialogPopUp(true);
    setDeleteId(id);
  };

  //cancel button (not update anything)
  const cancelEdit = () => {
    setEditState(false);
    setCelebData({ ...celebData, ...initialCelebData });
  };

  useEffect(() => {
    setCelebData({
      id: val?.id,
      first: val?.first,
      picture: val?.picture,
      last: val?.last,
      email: val?.email,
      dob: new Date().getFullYear() - new Date(val?.dob).getFullYear(),
      gender: val?.gender,
      country: val?.country,
      description: val?.description,
    });
    setName(val?.first + " " + val?.last);
    setInitialCelebdata({ ...initialCelebData, ...celebData });
  }, [allData]);
  return (
    <>
      <Wrapper
        className="celebrities-container"
        val={dropIcon}
        addBorder={editState}
        checkColor={checkDisable}
      >
        <div className="celebrities">
          <div className="img-name">
            <div className="img-container">
              <img src={picture} alt="not found" />
            </div>
            <div className="name">
              <input
                className="input-box input-name"
                disabled={editState ? false : true}
                type="text"
                name="name"
                value={name}
                onChange={(e) => handleCelebData(e.target.name, e.target.value)}
              />
            </div>
          </div>
          <div className="arrow">
            {dropIcon ? (
              <AiOutlineMinus
                className="drop-icon"
                onClick={() => !editState && setDropIcon(false)}
              />
            ) : (
              <AiOutlinePlus
                className="drop-icon"
                onClick={() => setDropIcon(true)}
              />
            )}
          </div>
        </div>
        <div className="celebrities-detail">
          <div className="age-box box">
            <label htmlFor="age">Age</label>
            <input
              className="input-box"
              disabled={editState ? false : true}
              type="text"
              name="dob"
              id="age"
              value={dob}
              onChange={(e) => handleCelebData(e.target.name, e.target.value)}
            />
          </div>

          <div className="gender-box box">
            <label htmlFor="gender">Gender</label>
            <select
              className="input-box select-box"
              disabled={editState ? false : true}
              value={gender}
              name="gender"
              id="gender"
              onChange={(e) => handleCelebData(e.target.name, e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="transgender">Transgender</option>
              <option value="Not say">Rather not say</option>
            </select>
          </div>

          <div className="country-box box">
            <label htmlFor="country">Country</label>
            <input
              className="input-box"
              type="text"
              disabled={editState ? false : true}
              name="country"
              id="country"
              value={country}
              onChange={(e) => handleCelebData(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="description-container">
          <div className="description box">
            <label htmlFor="description">Description</label>
            <textarea
              className="input-box input-description"
              type="text"
              disabled={editState ? false : true}
              value={description}
              name="description"
              id="description"
              onChange={(e) => handleCelebData(e.target.name, e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="edit-container">
          {!editState ? (
            <div>
              <BiSolidEditAlt
                className="update-icon edit-icon"
                onClick={() => dob > 17 && setEditState(true)}
              />
              <MdDelete
                onClick={() => handleDelete(id)}
                className="update-icon delete-icon"
              />
            </div>
          ) : (
            <div>
              <AiOutlineCheckCircle
                className="update-icon check-icon"
                onClick={() => setUpdateData(val?.id)}
              />
              <MdOutlineCancel
                onClick={() => cancelEdit()}
                className="update-icon cancel-icon"
              />
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Celebrities;

//style Component
const Wrapper = styled.div`
border: 2px solid grey;
overflow: hidden;
border-radius: 5px;
height:${({ val }) => (!val ? "75px" : "auto")};

.input-box{
  font-size:1.2em;
  border:none;
  background-color: transparent;
  font-family: 'Poppins', sans-serif;
  border:${({ addBorder }) => (addBorder ? "1px solid black" : "none")};
  border-radius:5px;
  &:focus{
    outline:none;
  }
}
}

label,.input-name{
  font-weight:bold;
  font-size:1.2em;
}
.select-box{
  appearance: none;
}
.celebrities{
  display: flex;
  justify-content:space-between;
  align-items:center;
  padding: 10px 10px
}
.img-name{
  display: flex;
  align-items: center;
}

.name{
  margin-left:20px;
}
.img-container{
  width: 50px;
  overflow: hidden;
  height: 50px;
  border-radius: 50%;

  img{
    width:100%;
  }
}

.arrow{
  float:right;
}

.drop-icon{
  font-size: 1.5em;
}
.celebrities-detail{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px
}

.description{
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
}

.input-description{
  min-height:120px;
}
.box{
  display:flex;
  flex-direction:column;
}

.edit-container{
  padding:10px 10px;
  display:flex;
  justify-content:flex-end;
  align-items:center;
}

.update-icon{
  font-size: 1.7em;
  margin: 0px 8px;
}

.edit-icon{
  color:blue;
}
.delete-icon,.cancel-icon{
  color:red;
}

.check-icon{
  color:green;
  border-radius: 50%;
}
@media(max-width:576px){
  font-size:13px;
  .input-box{
    font-size:0.9em;
    width:80%;
  }
  .input-description{
    width:100%;
  }
}
`;
