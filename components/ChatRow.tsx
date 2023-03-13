import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    query(collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'), orderBy('createdAt', 'asc'))
  );

  useEffect(() => {
    if (!pathName) return;
    setActive(pathName.includes(id));
  }, [pathName]);

  const removeChat = async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
    router.push('/');
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`rounded-lg px-5 py-3 text-sm flex  space-x-2 hover:bg-gray-700/70 cursor-pointer text-gray-300 transition-all duration-200 ease-out  ${
        active && 'bg-gray-700/50'
      }`}
    >
      <ChatBubbleLeftIcon className="flex-none h-5 w-5" />
      <p
        className="flex-initial truncate
      "
      >
        {messages?.docs[messages.docs.length - 1]?.data().text || 'New Chat'}
      </p>
      <TrashIcon className="flex-none h-5 w-5 text-gray-700 hover:text-red-700" onClick={removeChat} />
    </Link>
  );
}

export default ChatRow;