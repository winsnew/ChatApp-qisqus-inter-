export interface Participant {
  id: string;
  name: string;
  role: number;
}

export interface Room {
  name: string;
  id: number;
  image_url: string;
  last_message?: string;
  last_message_time?: string;
  unread_count?: number;
  participant: Participant[];
}

export interface Comment {
  id: number;
  type: 'text' | 'image' | 'video' | 'pdf';
  message: string;
  sender: string;
  timestamp?: string;
  file_url?: string;
  file_name?: string;
  file_size?: string;
}

export interface ChatRoom {
  room: Room;
  comments: Comment[];
}

export interface ChatResponse {
  results: ChatRoom[];
}