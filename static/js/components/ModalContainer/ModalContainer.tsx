import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { launchpadOriginSelector } from 'redux/selectors';

export const ModalContainer = ({
  title,
  footer,
  centered = true,
  className = '',
  children
}: {
  title?: string | React.ReactNode;
  footer?: string | React.ReactNode;
  centered?: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  const launchpadOrigin = useSelector(launchpadOriginSelector);
  const [close, setClose] = React.useState(false);

  const handleClose = () => {
    setClose(true);
  };

  React.useEffect(() => {
    return () => {
      setClose(false);
    };
  }, []);

  return close ? (
    <Navigate
      to={{
        pathname: launchpadOrigin.pathname,
        search: launchpadOrigin.search
      }}
    />
  ) : (
    <Modal
      show={true}
      keyboard={false}
      backdrop='static'
      onHide={handleClose}
      className={className}
      animation={false}
      centered={centered}
    >
      <Modal.Header closeButton closeVariant='white'>
        {title}
      </Modal.Header>

      <Modal.Body className='p-3 p-sm-spacer shadow'>{children}</Modal.Body>
      {footer && (
        <Modal.Footer className='pt-0 px-3 pb-3 px-sm-spacer pb-sm-spacer border-0'>
          {footer}
        </Modal.Footer>
      )}
    </Modal>
  );
};
