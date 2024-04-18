import { useEffect, useRef } from 'react';

const Messages = ({ messages }) => {
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  }, [messages]);

  const buildMessage = (m) => (
    <div key={m.id} className="text-break mb-2">
      <b>{m.username}</b>
      {`: ${m.body}`}
    </div>
  );

  return (
    <div ref={messageRef} id="messages-box" className="px-5 overflow-auto">
      {messages.map((msg) => buildMessage(msg))}
    </div>
  );
};

export default Messages;
