import "./App.css";
import Header from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Modals from "./components/modals";
import List from "./components/list";
import Init from "./components/init";


function App() {
  //states
  const [show, setShow] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [userDeleteKey, setUserDeleteKey] = useState("");
  const [keyLi, setkeyLi] = useState("");
  const [list, setlist] = useState({});

  ///Add a new user
  async function addUser(item) {
    console.log(item);
    if (item in list) {
      alert("user already present");
    } else {
      const rawResponse = await fetch("/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: item }),
      });
      const content = await rawResponse.json();
      console.log(content);
      setlist({ [item]: { notask: "notask" }, ...list });
    }
  }

   //delete a task
  function deleteTask(key, mainKey) {
    //console.log(key,mainKey)
    let { [mainKey]: tmp } = list;
    console.log(mainKey);
    console.log(key);
    console.log(tmp);
    console.log(Object.keys(tmp).length);
    fetch(`/api/users/${mainKey}/${key}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));

    if (Object.keys(tmp).length === 2) {
      setlist((prevState) => ({
        ...prevState,
        [mainKey]: {},
      }));
    } else {
      console.log(tmp);
      delete tmp[key];
      setlist((prevState) => ({
        ...prevState,
        [mainKey]: tmp,
      }));
    }
  }

  function renderOne() {
    return <Init addUser={addUser}></Init>;
  }

  function renderTwo() {
    return (
      <List
        list={list}
        handleShow={handleShow}
        deleteItem={deleteItem}
        deleteTask={deleteTask}
        setList={setList}
      ></List>
    );
  }

 
  const handleClose = () => {
    setShow(false);
  };

  const closeDelete = () => {
    setDelete(false);
    setUserDeleteKey("");
  };

  //add new task to a user
  const addNewTodo = async (value) => {
    console.log(list);
    const itemNo = Object.keys(list[keyLi]).length;
    console.log(keyLi, value, itemNo);
    const rawResponse = await fetch(`/api/users/${keyLi}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: value }),
    });
    const content = await rawResponse.json();
    console.log(content);
    setlist({
      ...list,
      [keyLi]: { ...list[keyLi], [content.key.name]: { taskdetail: value } },
    });
    handleClose();
  };


  const handleShow = (key) => {
    setkeyLi(key);
    setShow(true);
  };


  function setList({ key, mainKey, value }) {
    console.log(key, mainKey, value);
    let { [mainKey]: tmp, ...rest } = list;
    tmp[key] = { taskdetail: value };
    console.log(tmp);
    setlist({ ...rest, [mainKey]: tmp });
  }

  function mainDelete() {
    console.log(userDeleteKey);
    fetch(`/api/users/${userDeleteKey}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    const { [userDeleteKey]: tmp, ...rest } = list;
    console.log(tmp);
    console.log(rest);
    setlist(rest);
    closeDelete();
  }

  function deleteItem(key) {
    setDelete(true);
    setUserDeleteKey(key);
  }

  useEffect(() => {
    //fetch from Api
    fetch("/api/users")
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setlist(data);
      });
  }, []);

  return (
    <>
      <div className="App">
        <Header addUser={addUser}></Header>
        <div className="mainContainer">
          {Object.keys(list).length === 0 ? renderOne() : renderTwo()}
        </div>
      </div>
      <Modals
        handleClose={handleClose}
        show={show}
        addNew={addNewTodo}
        placeholder="Add a task here"
        beforeInput="Add Task"
      ></Modals>
      <Modal show={showDelete} onHide={closeDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete the user?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDelete}>
            No
          </Button>
          <Button variant="primary" onClick={mainDelete}>
            Yes!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
