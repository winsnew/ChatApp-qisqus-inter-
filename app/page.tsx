'use client';

import { useState, useEffect } from 'react';
import { ChatResponse, ChatRoom as ChatRoomType } from '@/lib/types/chat';
import Sidebar from '@/components/Sidebar';
import ChatRoom from '@/components/ChatRoom';
import styles from './page.module.css';

export default function HomePage() {
  const [rooms, setRooms] = useState<ChatRoomType[]>([]);
  const [activeRoom, setActiveRoom] = useState<ChatRoomType | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/chat');
        
        if (!response.ok) {
          throw new Error('Failed to fetch chat data');
        }
        
        const chatData: ChatResponse = await response.json();
        setRooms(chatData.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching chat data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile && activeRoom) {
      setIsMobileSidebarOpen(false);
    }
  }, [activeRoom, isMobile]);

  useEffect(() => {
    if (isMobile && !activeRoom) {
      setIsMobileSidebarOpen(true);
    }
  }, [activeRoom, isMobile]);

  const handleRoomSelect = (room: ChatRoomType) => {
    setActiveRoom(room);
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  };

  const handleBackToSidebar = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(true);
      setActiveRoom(null);
    }
  };

  const handleSendMessage = (message: string) => {
    if (!activeRoom) return;
    const newMessage = {
      id: Date.now(),
      type: 'text' as const,
      message,
      sender: 'customer@mail.com',
      timestamp: new Date().toISOString()
    };

    const updatedRoom = {
      ...activeRoom,
      comments: [...activeRoom.comments, newMessage],
      room: {
        ...activeRoom.room,
        last_message: message,
        last_message_time: new Date().toISOString()
      }
    };

    setActiveRoom(updatedRoom);

    // Update rooms state juga
    const updatedRooms = rooms.map(room =>
      room.room.id === updatedRoom.room.id ? updatedRoom : room
    );
    setRooms(updatedRooms);
  };

  useEffect(() => {
    if (isMobile && isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileSidebarOpen, isMobile]);

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <h2>Loading chats...</h2>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebarContainer} ${isMobileSidebarOpen ? styles.mobileOpen : ''}`}>
        <Sidebar
          rooms={rooms}
          activeRoom={activeRoom}
          onRoomSelect={handleRoomSelect}
        />
      </div>
      
      <div className={`${styles.chatContainer} ${activeRoom ? styles.chatOpen : ''}`}>
        {activeRoom ? (
          <ChatRoom
            room={activeRoom}
            currentUser="customer@mail.com"
            onSendMessage={handleSendMessage}
            onBack={isMobile ? handleBackToSidebar : undefined}
          />
        ) : (
          <div className={styles.noChatSelected}>
            <h2>Select a conversation</h2>
            <p>Choose a chat from the sidebar to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}