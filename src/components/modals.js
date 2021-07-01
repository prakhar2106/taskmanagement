import React, { useState } from "react";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";

function Modals({ addNew, handleClose, show, placeholder, beforeInput }) {
  const [value, setValue] = useState("");

  const Close = () => {
    handleClose();
  };
  const Add = () => {
    const item = value;
    setValue("");
    addNew(item);
  };

  const handleChange = (e) => setValue(e.target.value);
  return (
    <>
      <Modal show={show} onHide={Close} centered>
        <Modal.Header closeButton>
          <Modal.Title>{placeholder.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">{beforeInput}</InputGroup.Text>
            <FormControl
              placeholder={placeholder}
              aria-label={placeholder}
              aria-describedby="basic-addon1"
              value={value}
              onChange={handleChange}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Close}>
            Close
          </Button>
          <Button variant="primary" onClick={Add}>
            {beforeInput}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modals;
