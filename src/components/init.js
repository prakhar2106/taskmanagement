import React, { useState } from "react";
import "./init.css";
import { Button } from "react-bootstrap";
import Modals from "./modals";
function Init({ addUser }) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const addNew = (value) => {
    console.log(value);
    addUser(value);
    handleClose();
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="row container-fluid">
        <div className="col-md-6 colLeft d-flex">
          <div className="align-items-center">
            <p className="mainHead">
              Real-time Task Management platform, with Mutliple users 🚀
            </p>
            <p className="subHead">
              Task management is the process of managing a task through its life
              cycle. It involves planning, testing, tracking, and reporting.
            </p>
            <Button onClick={handleShow} style={{ fontSize: "20px" }}>
              Get Started 🚀
            </Button>
          </div>
        </div>
        <div className="col-md-6 colRight">
          <img
            className="image"
            alt="mainImage"
            src={process.env.PUBLIC_URL + "/main.svg"}
          ></img>
        </div>
      </div>
      <Modals
        handleClose={handleClose}
        show={show}
        addNew={addNew}
        placeholder="Add new user"
        beforeInput="Add User"
      ></Modals>
    </>
  );
}

export default Init;
