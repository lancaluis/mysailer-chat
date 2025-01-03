import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useChatStore from "@/store/useChatStore";
import apiService from "@/services/apiService";

import { Send, Image, Mic } from "lucide-react";

const TypeBar = () => {
  const { chat, setMessage } = useChatStore();
  const [typedMessage, setTypedMessage] = useState("");

  const IS_SEND_DISABLE = !typedMessage.trim();

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    try {
      const data = await apiService.sendMessageByChatId(chat.chat_id, {
        user_id: chat.participants[0],
        type: "text",
        content: typedMessage.trim(),
      });

      setMessage(data);
      setTypedMessage("");
    } catch (error) {
      alert(`Ocorreu um erro ao enviar a mensagem: ${error}`);
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={sendMessage}>
      <Input
        value={typedMessage}
        className="bg-[#1b354a] text-white border-[#38b5fd6c] placeholder:text-[#b5e3fd]"
        onChange={(e) => setTypedMessage(e.target.value)}
        placeholder="Digite uma mensagem..."
      />
      <Button
        size="icon"
        type="submit"
        className="bg-[#38B5FD] hover:bg-[#38B5FD]/90"
        disabled={IS_SEND_DISABLE}
      >
        <Send className="h-4 w-4" />
      </Button>
      {[Image, Mic].map((Icon, idx) => (
        <Button key={idx} size="icon" variant="outline" disabled>
          <Icon className="h-4 w-4" />
        </Button>
      ))}
    </form>
  );
};

export default TypeBar;
