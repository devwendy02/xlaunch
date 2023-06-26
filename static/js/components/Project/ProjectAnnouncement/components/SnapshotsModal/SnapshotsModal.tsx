import React, { useState } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';

import { Snapshots } from 'components/Snapshots';
import { currentProject } from 'config';

export const SnapshotsModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type='button'
        className='btn btn-dark btn-lg w-100'
        onClick={() => setShowModal(true)}
      >
        <FontAwesomeIcon icon={faInfoCircle} className='me-2' />
        Snapshots
      </button>
      {showModal && (
        <Modal
          show={showModal}
          backdrop={true}
          onHide={() => setShowModal(false)}
          className={`${currentProject} snapshots-modal`}
          animation={false}
          centered={true}
        >
          <Modal.Header closeButton closeVariant='white'>
            <h4 className='mb-0'>Snapshots</h4>
          </Modal.Header>
          <Modal.Body className='p-3 p-sm-spacer shadow'>
            <Snapshots />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
