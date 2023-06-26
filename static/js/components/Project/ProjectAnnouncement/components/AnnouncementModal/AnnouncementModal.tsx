import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Tab, Nav } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import { Table, AdditionalContent } from 'components';
import { RestrictedCountriesEnum } from 'config';
import { currentProject } from 'config';
import { getIcon } from 'helpers';

export const AnnouncementModal = ({
  modalData,
  secondTabData,
  geoCode,
  btnText,
  className,
  modalClassName
}: {
  modalData: any;
  secondTabData?: any;
  geoCode: string;
  btnText?: string;
  className?: string;
  modalClassName?: string;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [activeKey, setActiveKey] = useState('modal');

  if (!modalData || Object.keys(RestrictedCountriesEnum).includes(geoCode)) {
    return null;
  }

  const ModalContent = ({ content }: { content: any }) => (
    <>
      {content?.table && <Table table={content?.table} />}
      <AdditionalContent content={content} />
      {content?.description && (
        <div className='mt-spacer description text-center'>
          <ReactMarkdown linkTarget='_blank'>
            {content.description}
          </ReactMarkdown>
        </div>
      )}
    </>
  );

  return (
    <>
      <button
        type='button'
        className={className ?? 'btn btn-dark btn-lg w-100'}
        onClick={() => setShowModal(true)}
      >
        {btnText ? (
          btnText
        ) : (
          <>
            {modalData?.btnIcon && (
              <FontAwesomeIcon
                icon={getIcon(modalData.btnIcon)}
                className='me-2'
              />
            )}
            {modalData?.btnText}
          </>
        )}
      </button>
      {showModal && (
        <Modal
          show={showModal}
          backdrop={true}
          onHide={() => setShowModal(false)}
          className={`announcement-modal ${
            modalClassName ?? ''
          } ${currentProject}`}
          animation={false}
          centered
        >
          <Tab.Container
            defaultActiveKey={activeKey}
            onSelect={(selectedKey) => {
              selectedKey ? setActiveKey(selectedKey) : null;
            }}
            activeKey={activeKey}
          >
            <Modal.Header closeButton closeVariant='white'>
              {secondTabData ? (
                <div className='tabs'>
                  <Nav.Link
                    eventKey='modal'
                    className={`tab ${activeKey === 'modal' ? 'active' : ''}`}
                  >
                    {modalData?.title}
                  </Nav.Link>
                  <Nav.Link
                    eventKey='modal1'
                    className={`tab ${activeKey === 'modal1' ? 'active' : ''}`}
                  >
                    {secondTabData?.title}
                  </Nav.Link>
                </div>
              ) : (
                <h4 className='mb-0'>{modalData?.title}</h4>
              )}
            </Modal.Header>
            <Modal.Body className='p-3 p-sm-spacer shadow'>
              {secondTabData ? (
                <Tab.Content>
                  <Tab.Pane eventKey='modal'>
                    <ModalContent content={modalData} />
                  </Tab.Pane>
                  <Tab.Pane eventKey='modal1'>
                    <ModalContent content={secondTabData} />
                  </Tab.Pane>
                </Tab.Content>
              ) : (
                <ModalContent content={modalData} />
              )}
            </Modal.Body>
          </Tab.Container>
        </Modal>
      )}
    </>
  );
};
