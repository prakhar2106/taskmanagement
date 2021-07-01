import React, { useState } from "react";
import Modals from "./modals";
function List({ list, deleteItem, handleShow, deleteTask, setList }) {

  //states
  const [showRename, setShowRename] = useState(false);
  const [detail, setDetail] = useState({ key: "", value: "" });

  function allData(l, mainKey) {
    return Object.keys(l).map((key, i) => {
      return key !== "notask" ? (
        <div key={i + "task"} className="listInfo">
          <span style={{ marginRight: "5px" }}></span>
          <span onClick={() => handleShowRename(key, mainKey)}>
            {l[key].taskdetail}
          </span>
          <span className="circle" onClick={() => deleteTask(key, mainKey)}>
            X
          </span>
        </div>
      ) : (
        ""
      );
    });
  }

  function noData() {
    return (
      <div className="noTask">No tasks present, add a task to this user.</div>
    );
  }

 
  const handleCloseRename = () => {
    setShowRename(false);
  };
  const rename = (value) => {
    const putMethod = {
      method: "PUT", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify({ taskdetail: value }), // We send data in JSON format
    };
    // make the HTTP put request using fetch api
    fetch(`/api/users/${detail.value}/${detail.key}`, putMethod)
      .then((response) => response.json())
      .then((data) => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
      .catch((err) => console.log(err)); // Do something with the error
    console.log(value);
    console.log(detail);
    setList({ key: detail.key, mainKey: detail.value, value: value });
    setDetail({ key: "", value: "" });
    handleCloseRename();
  };


  const handleShowRename = (key, mainKey) => {
    console.log(key, mainKey);
    setDetail({ key: key, value: mainKey });
    setShowRename(true);
  };

  return (
    <>
      <ul className="mainUl">
        {Object.keys(list).map((e, index) => {
          return (
            <li key={index + "mainli"} className="mainUserItem">
              <div className="head">
                <div className="left childhead">
                  <div className="leftblock">
                    <button className="cross" onClick={() => deleteItem(e)}>
                      X
                    </button>
                    <div className="para">{e}</div>
                  </div>
                </div>
                <div className="right childhead">
                  <button className="add" onClick={() => handleShow(e)}>
                    Add Task
                  </button>
                </div>
              </div>
              <div className="task">
                {Object.keys(list[e]).length === 1
                  ? noData()
                  : allData(list[e], e)}
              </div>
            </li>
          );
        })}
      </ul>
      <Modals
        handleClose={handleCloseRename}
        show={showRename}
        addNew={rename}
        placeholder="Rename the current task"
        beforeInput="Rename"
      ></Modals>
    </>
  );
}

export default List;
