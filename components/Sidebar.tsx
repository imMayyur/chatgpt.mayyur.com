'use client';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { collection, orderBy, query } from 'firebase/firestore';
import { signOut, useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';
import NewChat from './NewChat';

function Sidebar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session && query(collection(db, 'users', session?.user?.email!, 'chats'), orderBy('createdAt', 'asc'))
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />

          <div className="hidden sm:inline">
            <ModelSelection />
          </div>

          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <div className="flex justify-between items-center">
          <img
            src={session?.user?.image || ''}
            alt="Profile Picture"
            className="h-12 w-12 rounded-full cursor-pointer mx-auto my-2 hover:opacity-50"
          />
          <ArrowRightOnRectangleIcon
            className="h-8 w-8 mx-auto cursor-pointer hover:opacity-50 text-white my-2"
            onClick={() => {
              signOut();
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
