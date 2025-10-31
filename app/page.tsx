'use client';

import { useState, useEffect } from 'react';
import { ChatResponse, ChatRoom as ChatRoomType } from '@/lib/types/chat';
import Sidebar from '@/components/Sidebar';
import ChatRoom from '@/components/ChatRoom';
import styles from './page.module.css';

const chatData: ChatResponse = {
  "results": [
    {
      "room": {
        "name": "Product A Support",
        "id": 12456,
        "image_url": "https://picsum.photos/id/237/200/300",
        "last_message": "Baik, silahkan kirimkan lampiran bukti pembayarannya",
        "last_message_time": "2024-01-01T10:05:00",
        "unread_count": 2,
        "participant": [
          {
            "id": "admin@mail.com",
            "name": "Admin",
            "role": 0
          },
          {
            "id": "agent@mail.com",
            "name": "Agent A",
            "role": 1
          },
          {
            "id": "customer@mail.com",
            "name": "king customer",
            "role": 2
          }
        ]
      },
      "comments": [
        {
          "id": 885512,
          "type": "text",
          "message": "Selamat malam",
          "sender": "customer@mail.com",
          "timestamp": "2024-01-01T10:00:00"
        },
        {
          "id": 885513,
          "type": "text",
          "message": "Malam",
          "sender": "agent@mail.com",
          "timestamp": "2024-01-01T10:01:00"
        },
        {
          "id": 885517,
          "type": "image",
          "message": "Bukti pembayaran transfer",
          "file_url": "https://picsum.photos/id/238/400/300",
          "file_name": "payment-proof.jpg",
          "sender": "customer@mail.com",
          "timestamp": "2024-01-01T10:06:00"
        }
      ]
    },
    {
      "room": {
        "name": "Technical Support",
        "id": 12457,
        "image_url": "https://picsum.photos/id/239/200/300",
        "last_message": "Saya akan kirimkan tutorial penggunaannya",
        "last_message_time": "2024-01-01T09:30:00",
        "unread_count": 0,
        "participant": [
          {
            "id": "admin@mail.com",
            "name": "Admin",
            "role": 0
          },
          {
            "id": "tech@mail.com",
            "name": "Tech Support",
            "role": 1
          },
          {
            "id": "customer@mail.com",
            "name": "king customer",
            "role": 2
          }
        ]
      },
      "comments": [
        {
          "id": 885518,
          "type": "pdf",
          "message": "Invoice pembayaran",
          "file_url": "/documents/invoice.pdf",
          "file_name": "invoice_12345.pdf",
          "file_size": "2.1 MB",
          "sender": "tech@mail.com",
          "timestamp": "2024-01-01T09:25:00"
        },
        {
          "id": 885519,
          "type": "video",
          "message": "Tutorial penggunaan produk",
          "file_url": "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
          "file_name": "tutorial.mp4",
          "file_size": "1.5 MB",
          "sender": "tech@mail.com",
          "timestamp": "2024-01-01T09:30:00"
        }
      ]
    },
    {
      "room": {
        "name": "Sales Inquiry",
        "id": 12458,
        "image_url": "https://picsum.photos/id/240/200/300",
        "last_message": "Terima kasih atas informasinya",
        "last_message_time": "2024-01-01T08:45:00",
        "unread_count": 5,
        "participant": [
          {
            "id": "sales@mail.com",
            "name": "Sales Agent",
            "role": 1
          },
          {
            "id": "customer@mail.com",
            "name": "king customer",
            "role": 2
          }
        ]
      },
      "comments": [
        {
          "id": 885520,
          "type": "text",
          "message": "Saya tertarik dengan produk Anda",
          "sender": "customer@mail.com",
          "timestamp": "2024-01-01T08:30:00"
        },
        {
          "id": 885521,
          "type": "text",
          "message": "Bisa saya tahu lebih detail?",
          "sender": "customer@mail.com",
          "timestamp": "2024-01-01T08:35:00"
        }
      ]
    }
  ]
};

export default function HomePage() {
  const [rooms] = useState<ChatRoomType[]>(chatData.results);
  const [activeRoom, setActiveRoom] = useState<ChatRoomType | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

    const updatedRooms = rooms.map(room =>
      room.room.id === updatedRoom.room.id ? updatedRoom : room
    );
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