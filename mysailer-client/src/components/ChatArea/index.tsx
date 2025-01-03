import { useEffect, useCallback } from "react";

import Message from "@/components/ChatArea/Message";
import TypeBar from "@/components/ChatArea/TypeBar";

import apiService from "@/services/apiService";

import useChatStore from "@/store/useChatStore";
import WebSocketService from "@/services/webSocketService";

import { User } from "lucide-react";

export default function ChatArea() {
  const { chat, messages, status, setStatus, setMessages } = useChatStore();

  const fetchMessages = useCallback(async () => {
    try {
      const response = await apiService.getMessagesByChatId(chat.chat_id);
      setMessages(response);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [chat.chat_id, setMessages]);

  const initializeWebSocket = useCallback(() => {
    const wsService = new WebSocketService(
      `ws://localhost:8000/ws/${chat.chat_id}`
    );

    wsService.connect(
      (event: string, data: object) => {
        console.log("🚀 ~ initializeWebSocket ~ data:", data);
        const eventHandlers: Record<string, () => void> = {
          message_received: () => setMessages([...messages, data]),
          presence_updated: () => setStatus(data),
        };
        eventHandlers[event]?.();
      },
      (error) => console.error("WebSocket error:", error)
    );

    return wsService;
  }, [chat.chat_id, setMessages, setStatus, messages]);

  useEffect(() => {
    const wsService = initializeWebSocket();
    return () => wsService.disconnect();
  }, [initializeWebSocket]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const renderStatus = () => {
    const statusMapping: Record<string, JSX.Element> = {
      online: <p className="text-sm text-[#b5e3fd]">Online</p>,
      typing: <p className="text-sm text-[#b5e3fd]">Digitando...</p>,
      offline: (
        <p className="text-sm text-[#b5e3fd]">
          {status.last_seen &&
            `Visto por último às ${new Date(
              status.last_seen
            ).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}`}
        </p>
      ),
    };

    return statusMapping[status.status];
  };

  return (
    <div className="flex flex-col h-full border-l border-[#38b5fd6c] bg-[#1F3D55]">
      <div className="p-4 border-b border-[#38b5fd6c] bg-[#1F3D55]">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#6bc9ff] mr-3 flex items-center justify-center text-[#1F3D55]">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              {chat.participants[0]}
            </h2>
            {renderStatus()}
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>

      <div className="p-4 border-t border-[#38b5fd6c] bg-[#1F3D55]">
        <TypeBar />
      </div>
    </div>
  );
}
