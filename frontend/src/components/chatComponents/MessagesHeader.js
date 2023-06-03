import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getCurrentChannel, getMessagesCurrentChannel } from '../../redux/selectors';

const MessageHeader = () => {
  const { t } = useTranslation();
  const { name } = useSelector(getCurrentChannel);
  const { length } = useSelector(getMessagesCurrentChannel);
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0"><b>{`# ${name}`}</b></p>
      <span className="text-muted">{`${t('chat.messagesCount', { count: length })}`}</span>
    </div>
  );
};

export default MessageHeader;
