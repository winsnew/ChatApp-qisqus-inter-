import { Comment } from '@/lib/types/chat';
import MessageBubble from './MessageBubble';
import styles from './ChatRoom.module.css';

interface ChatMessagesProps {
  messages: Comment[];
  currentUser: string;
}

export default function ChatMessages({ messages, currentUser }: ChatMessagesProps) {
  return (
    <div className={styles.chatMessages}>
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isSent={message.sender === currentUser}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}