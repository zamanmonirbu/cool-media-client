import React, { useState } from 'react';
import Modal from 'react-modal';
import './Location.css';

// Set the app element for accessibility
Modal.setAppElement('#root');

const Location = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      {/* <button onClick={openModal}>Show Location</button> */}
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Location Modal"
        className="modal"
        overlayClassName="overlay"
      > */}
        <button onClick={closeModal} className="close-button">&times;</button>
        <div className="modal-content">
          <div style={{ width: '100%' }}>
            <iframe
              width="100%"
              height="400"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=University%20of%20Barishal+(My%20Location)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              {/* <a href="https://www.gps.ie/">gps systems</a> */}
            </iframe>
          </div>
        </div>
      {/* </Modal> */}
    </div>
  );
};

export default Location;
