import React from "react";
import { Modal } from "react-bootstrap";

const ModalC = ({ show, handleCloseModalC, selectedContact }) => {
  return (
    <Modal show={show} onHide={handleCloseModalC}>
      <Modal.Header closeButton>
        <Modal.Title>Modal C</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h4> Contact Details</h4>
          <p>Country: {selectedContact?.country?.name}</p>
          <p>Phone: {selectedContact?.phone}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalC;
