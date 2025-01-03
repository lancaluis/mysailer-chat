import { useEffect, useState } from "react";

import { CONTACTS } from "@/services/mock";
import apiService from "@/services/apiService";
import useChatStore from "@/store/useChatStore";

import { EmptyState } from "./EmptyState";
import { ContactCard } from "./ContactCard";

import { Button } from "@/components/ui/button";

import { PenBox, XCircleIcon } from "lucide-react";

export default function Sidebar() {
  const { chats, setChat, setChats } = useChatStore();

  const [openContacts, setOpenContacts] = useState<boolean>(false);

  const onSelectChat = (chat_id: string) => {
    const selectedChat = chats.find((chat) => chat.chat_id === chat_id);
    if (selectedChat) {
      setChat(selectedChat);
    }
  };

  const createChat = async (e: React.FormEvent, user_name: string) => {
    e.preventDefault();
    try {
      const data = await apiService.createChat(user_name);
      onSelectChat(data.chat_id);
      setChats([...chats, data]);
      setOpenContacts(false);
      return data;
    } catch (error) {
      alert(`Ocorreu um erro: ${error}`);
    }
  };

  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await apiService.getChats();
        setChats(data);
      } catch (error) {
        alert(`Ocorreu um erro: ${error}`);
      }
    };
    getChats();
  }, [setChats]);

  return (
    <div className="flex flex-col h-full bg-[#1F3D55] p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-white">Conversas</h1>
        <Button
          variant="ghost"
          className="text-[#b5e3fd]"
          onClick={() => setOpenContacts(!openContacts)}
        >
          {openContacts ? (
            <div className="flex items-center gap-1">
              <XCircleIcon className="h-4 w-4" />
              Fechar
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <PenBox className="h-4 w-4" />
              Novo Chat
            </div>
          )}
        </Button>
      </div>

      <div className="flex-grow overflow-y-auto my-4">
        {chats.length === 0 && !openContacts && <EmptyState />}

        {openContacts && (
          <div className="rounded-sm">
            <h2 className="text-md font-semibold text-[#b5e3fd] mb-4">
              Contatos
            </h2>
            {CONTACTS.map(({ name }, index) => (
              <ContactCard
                key={index}
                name={name}
                handleClick={(e) => createChat(e, name)}
              />
            ))}
          </div>
        )}

        {!openContacts &&
          chats.map(({ chat_id, participants }) => (
            <ContactCard
              key={chat_id}
              name={participants[0]}
              handleClick={() => onSelectChat(chat_id)}
            />
          ))}
      </div>
    </div>
  );
}
