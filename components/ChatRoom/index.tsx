import { ChatRoom as ChatRoomType } from '@/lib/types/chat';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import styles from './ChatRoom.module.css';

interface ChatRoomProps {
  room: ChatRoomType;
  currentUser: string;
  onSendMessage: (message: string) => void;
  onBack?: () => void;
}

export default function ChatRoom({ room, currentUser, onSendMessage, onBack }: ChatRoomProps) {
  return (
    <div className={styles.chatRoom}>
      <ChatHeader room={room.room} onBack={onBack} />
      <ChatMessages 
        messages={room.comments} 
        currentUser={currentUser}
      />
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}