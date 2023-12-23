import React, { useState } from "react";
import ModalA from "./ModalA";
import ModalB from "./ModalB";

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);

  const handleToggleModalA = () => {
    setShowModalA(!showModalA);
  };
  const handleClose = () => {
    setShowModalA(false);
    setShowModalB(false);
  };

  const handleAllContacts = () => {
    setShowModalA(true);
    setShowModalB(false);
  };

  const handleUSContacts = () => {
    setShowModalA(false);
    setShowModalB(true);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleAllContacts}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleUSContacts}
          >
            US Contacts
          </button>
        </div>
      </div>

      {/* Modal A */}
      <ModalA
        show={showModalA}
        handleClose={handleClose}
        handleAllContactsModal={handleAllContacts}
        handleUSContacts={handleUSContacts}
      />

      {/* Modal B */}
      <ModalB
        show={showModalB}
        handleClose={handleClose}
        handleAllContactsModal={handleAllContacts}
        handleUSContacts={handleUSContacts}
      />
    </div>
  );
};

export default Problem2;
