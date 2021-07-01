import React, { useState } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import Modals from './modals'
import "./style.css";

function Header({addUser}) {
  const [show, setShow] = useState(false);
  const handleClose = () =>{
    setShow(false);
  } 
  const addNew = (value) => {
     console.log(value)
     addUser(value)
     handleClose();
  }
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand="lg" variant="light">
        <Container>
          <Navbar.Brand href="#">Task Management</Navbar.Brand>
          <Button variant="primary" onClick={handleShow}>
            ADD USER
          </Button>
        </Container>
      </Navbar>
      <Modals handleClose = {handleClose} show = {show} addNew = {addNew} placeholder="Add new user" beforeInput="Add User"></Modals>
    </>
  );
}

export default Header;
