import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import ModalC from "./ModalC";

const ModalB = ({ show, handleClose, handleAllContactsModal }) => {
  const [contacts, setContacts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [showData, setShowData] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  //base url
  const baseUrl = import.meta.env.VITE_BASE_URL;
  //close modal c
  const handleCloseModalC = () => {
    setShowModalC(false);
  };
  //select contact
  const handleContactSelect = (item) => {
    setSelectedContact(item);
    handleClose();
    setShowModalC(true);
    setShowData(false);
  };
  //handle close
  const handleCloseBtn = () => {
    setShowData(false);
    handleClose();
  };
  //handle us contacts

  const handleAllContacts = () => {
    setShowData(false);
    handleAllContactsModal();
  };

  //handle all contacts
  const handleUSContactsBtn = () => {
    // Fetch contacts when Modal A is opened
    setShowData(true);
    fetchContacts();
  };
  //fetch contacts
  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `https://contact.mediusware.com/api/country-contacts/United States/?page=${pageNumber}`
      );
      const data = await response.json();

      // Update state with new contacts
      setContacts((prevContacts) => [...prevContacts, ...data.results]);

      // Update hasMore based on API response
      setHasMore(data.next !== null);

      // Increment page number for the next fetch
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Load more contacts when scrolling to the bottom
  const loadMoreContacts = () => {
    fetchContacts();
  };

  useEffect(() => {
    // Reset contacts and page number when Modal A is closed
    if (!show) {
      setContacts([]);
      setPageNumber(1);
    }
  }, [show]);
  return (
    <>
      <Modal show={show} onHide={handleCloseBtn}>
        <Modal.Header closeButton>
          <Modal.Title>Modal B</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            onClick={handleAllContacts}
            style={{ backgroundColor: "#46139f", borderColor: "#46139f" }}
          >
            All Contacts
          </Button>{" "}
          <Button
            onClick={handleUSContactsBtn}
            style={{ backgroundColor: "#ff7f50", borderColor: "#ff7f50" }}
          >
            Us Contacts
          </Button>{" "}
          <Button
            onClick={handleCloseBtn}
            style={{ backgroundColor: "#46139f", borderColor: "#46139f" }}
          >
            Close
          </Button>
          {showData && (
            <InfiniteScroll
              dataLength={contacts.length}
              next={loadMoreContacts}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              height={300}
            >
              {/* Render contacts */}
              {contacts.map((contact) => (
                <Card key={contact.id} className="my-3 me-3">
                  <Card.Body
                    onClick={() => handleContactSelect(contact)}
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Title>{contact?.country?.name}</Card.Title>
                    <Card.Text>{contact?.phone}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </InfiniteScroll>
          )}
        </Modal.Body>
      </Modal>
      <ModalC
        show={showModalC}
        handleCloseModalC={handleCloseModalC}
        selectedContact={selectedContact}
      />
    </>
  );
};

export default ModalB;
