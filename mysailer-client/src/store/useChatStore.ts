import { create } from "zustand";

export type Message = {
  id: string;
  user_id: string;
  type: string;
  content: string;
  timestamp: string;
};

type Chat = {
  chat_id: string;
  participants: string[];
  messages?: Message[];
};

type Status = {
  user_id: string;
  status: "online" | "offline" | "typing";
  last_seen: string;
};

type ChatStore = {
  chat: Chat;
  setChat: (chat: Chat) => void;

  chats: Chat[];
  setChats: (chats: Chat[]) => void;

  message: Message;
  setMessage: (message: Message) => void;

  messages: Message[];
  setMessages: (messages: Message[]) => void;

  status: Status;
  setStatus: (status: Status) => void;
};

const useChatStore = create<ChatStore>((set) => ({
  chat: {
    chat_id: "",
    participants: [],
    messages: [],
  },
  chats: [],
  message: {
    id: "",
    user_id: "",
    type: "",
    content: "",
    timestamp: "",
  },
  messages: [],
  status: {
    user_id: "",
    status: "offline",
    last_seen: "",
  },

  setStatus: (status) => set({ status }),
  setChat: (chat) => set({ chat }),
  setChats: (chats) => set({ chats }),
  setMessage: (message) => set({ message }),
  setMessages: (messages) => set({ messages }),
}));

export default useChatStore;
