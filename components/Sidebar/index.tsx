import { ChatRoom } from '@/lib/types/chat';
import SidebarItem from './SidebarItem';
import styles from './Sidebar.module.css';

interface SidebarProps {
  rooms: ChatRoom[];
  activeRoom: ChatRoom | null;
  onRoomSelect: (room: ChatRoom) => void;
}

export default function Sidebar({ rooms, activeRoom, onRoomSelect }: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>Messages</h2>
        <button className={styles.newChatButton}>+ New Chat</button>
      </div>
      
      <div className={styles.sidebarSearch}>
        <input
          type="text"
          placeholder="Search conversations..."
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.sidebarList}>
        {rooms.map((room) => (
          <SidebarItem
            key={room.room.id}
            room={room.room}
            isActive={activeRoom?.room.id === room.room.id}
            onClick={() => onRoomSelect(room)}
          />
        ))}
      </div>
    </div>
  );
}