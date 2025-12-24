export interface RoomMember {
  id: string;
  name: string;
  avatar: string;
  role: "host" | "guest";
  isListening: boolean;
}

export interface QueueSong {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  addedBy: string;
}
