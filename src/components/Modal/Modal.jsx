import { useState } from "react";

export function Modal() {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>

      <button onClick={showModal}>Show Modal</button>

      {/* Hvis modalOpen er true, vis modalindholdet */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>Hello Modal</p>
            {/* Knappen til at lukke modalen */}
            <button onClick={closeModal}>Close Modal</button>
          </div>
        </div>
      )}
    </>
  );
}
