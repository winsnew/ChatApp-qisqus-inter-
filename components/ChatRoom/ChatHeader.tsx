import { Room } from '@/lib/types/chat';
import Avatar from '../Profile/Avatar';
import styles from './ChatRoom.module.css';

interface ChatHeaderProps {
  room: Room;
  onBack?: () => void;
}

export default function ChatHeader({ room, onBack }: ChatHeaderProps) {
  return (
    <div className={styles.chatHeader}>
      {onBack && (
        <button className={styles.backButton} onClick={onBack} aria-label="Back to conversations">
          ← 
        </button>
      )}
      
      <Avatar src={room.image_url} alt={room.name} size="small" />
      
      <div className={styles.chatHeaderInfo}>
        <h2>{room.name}</h2>
        <p>{room.participant.length} participants</p>
      </div>
      
      <div className={styles.chatHeaderActions}>
        <button className={styles.headerButton} aria-label="Call">📞</button>
        <button className={styles.headerButton} aria-label="More options">⋮</button>
      </div>
    </div>
  );
}