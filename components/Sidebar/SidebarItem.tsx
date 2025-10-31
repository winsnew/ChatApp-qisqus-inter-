import { Room } from '@/lib/types/chat';
import Avatar from '../Profile/Avatar';
import styles from './Sidebar.module.css';

interface SidebarItemProps {
  room: Room;
  isActive: boolean;
  onClick: () => void;
}

export default function SidebarItem({ room, isActive, onClick }: SidebarItemProps) {
  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div 
      className={`${styles.sidebarItem} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <Avatar src={room.image_url} alt={room.name} size="small" />
      
      <div className={styles.sidebarItemContent}>
        <div className={styles.sidebarItemHeader}>
          <h3 className={styles.roomName}>{room.name}</h3>
          <span className={styles.messageTime}>
            {formatTime(room.last_message_time)}
          </span>
        </div>
        
        <div className={styles.sidebarItemFooter}>
          <p className={styles.lastMessage}>
            {room.last_message || 'No messages yet'}
          </p>
          
          {room.unread_count && room.unread_count > 0 && (
            <span className={styles.unreadBadge}>
              {room.unread_count}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}