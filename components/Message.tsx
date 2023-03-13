import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';

type Props = {
  message: DocumentData;
  isLast: boolean;
};

function Message({ message, isLast }: Props) {
  const isChatGPT = message.user.name === 'ChatGPT';
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');

  useEffect(() => {
    if (index < message.text.length) {
      setTimeout(() => {
        setText(text + message.text[index]);
        setIndex(index + 1);
      }, 30);
    }

    if (isLast) {
      setDisplayMessage(text.replace(/(?:\r\n|\r|\n)/g, '<br />'));
    } else {
      setDisplayMessage(message.text.replace(/(?:\r\n|\r|\n)/g, '<br />'));
    }
  }, [index]);

  return (
    <div className={`py-5 text-white ${isChatGPT && 'bg-[#434654]'}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} alt="" className="rounded-full h-8 w-8" />
        <p className="pt-1 text-sm" id="messageDiv" dangerouslySetInnerHTML={{ __html: displayMessage }}></p>
      </div>
    </div>
  );
}

export default Message;
