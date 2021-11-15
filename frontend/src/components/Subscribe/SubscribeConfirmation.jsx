import React from 'react';
import { useTranslation } from 'react-i18next';
import './SubscribeConfirmation.scss';
import classnames from 'classnames';
import Modal from 'react-modal';
import { ConfirmationIcon } from '../../utils/_icons';

/**
 * This is the component for subscribe confirmation modal window.
 *
 * props:
 *    numberOfSubscriptions
 *      A number of successful subscriptions
 *    onClose
 *      A function/callback which is called when the window is being closed
 */

const SubscribeConfirmation = React.forwardRef((props, ref) => {
  const { numberOfSubscriptions, onClose } = props;
  const { t } = useTranslation();
  Modal.setAppElement('#root');
  
  return (
    <Modal
      isOpen
      style={
        {
          overlay: {
            zIndex: '3001',
          },
        }
      }
      className={classnames('subscribe-confirmation')}
      ref={ref}
    >
      <div className="modal-header">
        <ConfirmationIcon />
      </div>
      <div className="modal-body">
        <h4>
          {t(
            'meeting.tabs.agenda.list.subscribe.confirmation.title',
            { count: numberOfSubscriptions },
          )}
        </h4>
        <p>
          {t('meeting.tabs.agenda.list.subscribe.confirmation.description')}
        </p>
        <div className="row">
          <button
            type="button"
            onClick={onClose}
          >
            {t('meeting.tabs.agenda.list.subscribe.confirmation.button')}
          </button>
        </div>
      </div>
    </Modal>
  );
});

export default SubscribeConfirmation;
