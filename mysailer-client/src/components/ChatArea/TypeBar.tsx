import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useChatStore from "@/store/useChatStore";
import apiService from "@/services/apiService";

import { Send, Image, Mic } from "lucide-react";

const TypeBar = () => {
  const { chat, setMessage } = useChatStore();

  const [typedMessage, setTypedMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const [base64Data, setBase64Data] = useState<{
    image: string | null;
    audio: string | null;
  }>({
    image: null,
    audio: null,
  });

  const IS_SEND_DISABLE = !typedMessage.trim() && !imageFile && !audioFile;

  const convertFileToBase64 = (file: File, type: "image" | "audio") => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setBase64Data((prev) => ({ ...prev, [type]: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "audio"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "image") setImageFile(file);
      if (type === "audio") setAudioFile(file);

      setTypedMessage(type);
      convertFileToBase64(file, type);
    }
  };

  const sendMessage = async (
    e: React.FormEvent,
    type: "text" | "image" | "audio"
  ) => {
    e.preventDefault();
    let content = "";

    if (type === "text") {
      if (!typedMessage.trim()) return;
      content = typedMessage.trim();
    } else if (base64Data[type]) {
      content = base64Data[type]!;
    } else {
      alert("No file selected!");
      return;
    }

    try {
      const data = await apiService.sendMessageByChatId(chat.chat_id, {
        user_id: chat.participants[0],
        type,
        content,
      });

      setMessage(data);
      setTypedMessage("");
      setAudioFile(null);
      setImageFile(null);
    } catch (error) {
      alert(`Ocorreu um erro ao enviar a mensagem: ${error}`);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        value={typedMessage}
        className="bg-[#1b354a] text-white border-[#38b5fd6c] placeholder:text-[#b5e3fd]"
        onChange={(e) => setTypedMessage(e.target.value)}
        placeholder="Digite uma mensagem..."
      />
      <Button
        size="icon"
        onClick={(e) =>
          sendMessage(e, audioFile ? "audio" : imageFile ? "image" : "text")
        }
        className="bg-[#38B5FD] hover:bg-[#38B5FD]/90"
        disabled={IS_SEND_DISABLE}
      >
        <Send className="h-4 w-4" />
      </Button>

      {["image", "audio"].map((type) => (
        <Button
          key={type}
          size="icon"
          variant="outline"
          onClick={() => document.getElementById(`${type}-input`)?.click()}
        >
          {type === "image" ? (
            <Image className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
      ))}

      {["image", "audio"].map((type) => (
        <input
          key={type}
          type="file"
          id={`${type}-input`}
          style={{ display: "none" }}
          onChange={(e) => {
            if (type === "image") {
              handleFileChange(e, "image");
            } else if (type === "audio") {
              handleFileChange(e, "audio");
            }
          }}
          accept={`image/*, audio/*`}
        />
      ))}
    </div>
  );
};

export default TypeBar;
