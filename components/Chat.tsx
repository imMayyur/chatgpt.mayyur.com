'use client';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc'))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = document.getElementById('messages');
      messages?.scrollTo(0, messages.scrollHeight);
    }, 1000);
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden" id="messages">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">You have no messages in this chat.</p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-10 text-white animate-bounce" />
        </>
      )}
      {messages?.docs.map((message, index) => (
        <Message key={message.id} message={message.data()} isLast={index === messages.docs.length - 1} />
      ))}
    </div>
  );
}

export default Chat;
