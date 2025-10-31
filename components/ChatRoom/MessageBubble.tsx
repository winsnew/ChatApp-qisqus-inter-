import { Comment } from '@/lib/types/chat';
import styles from './ChatRoom.module.css';

interface MessageBubbleProps {
  message: Comment;
  isSent: boolean;
  currentUser: string;
}

export default function MessageBubble({ message, isSent, currentUser }: MessageBubbleProps) {
  const getSenderName = (senderId: string): string => {
    // In a real app, this would come from participant data
    const participants: { [key: string]: string } = {
      'customer@mail.com': 'king customer',
      'agent@mail.com': 'Agent A',
      'tech@mail.com': 'Tech Support',
      'sales@mail.com': 'Sales Agent',
      'admin@mail.com': 'Admin'
    };
    return participants[senderId] || senderId;
  };

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMediaMessage = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className={styles.mediaContainer}>
            <p className={styles.messageContent}>{message.message}</p>
            <img 
              src={message.file_url} 
              alt={message.file_name}
              className={styles.mediaImage}
              onClick={() => window.open(message.file_url, '_blank')}
            />
          </div>
        );
      
      case 'video':
        return (
          <div className={styles.mediaContainer}>
            <p className={styles.messageContent}>{message.message}</p>
            <video 
              controls 
              className={styles.mediaVideo}
            >
              <source src={message.file_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      
      case 'pdf':
        return (
          <div className={styles.mediaContainer}>
            <p className={styles.messageContent}>{message.message}</p>
            <a 
              href={message.file_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.fileAttachment}
            >
              <div className={styles.fileIcon}>📄</div>
              <div className={styles.fileInfo}>
                <div className={styles.fileName}>{message.file_name}</div>
                <div className={styles.fileSize}>{message.file_size}</div>
              </div>
            </a>
          </div>
        );
      
      default:
        return <p className={styles.messageContent}>{message.message}</p>;
    }
  };

  return (
    <div className={`${styles.message} ${isSent ? styles.messageSent : styles.messageReceived}`}>
      {!isSent && (
        <div className={styles.messageSender}>
          {getSenderName(message.sender)}
        </div>
      )}
      {renderMediaMessage()}
      <div className={styles.messageTime}>
        {formatTime(message.timestamp)}
      </div>
    </div>
  );
}