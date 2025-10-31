import { useState } from 'react';
import styles from './ChatRoom.module.css';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.chatInput}>
      <div className={styles.inputContainer}>
        <button type="button" className={styles.attachButton}>📎</button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className={styles.messageInput}
        />
        <button type="submit" className={styles.sendButton}>
          Send
        </button>
      </div>
    </form>
  );
}