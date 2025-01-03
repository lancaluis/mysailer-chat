import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import useChatStore from "@/store/useChatStore";

const ChatLayout = () => {
  const { chat } = useChatStore();

  const renderContent = () => {
    if (chat.chat_id) {
      return <ChatArea />;
    }

    return (
      <div className="flex flex-col items-center justify-center h-full border-l border-[#38b5fd6c] bg-[#1F3D55] text-muted-foreground">
        <img
          src="https://cdn.prod.website-files.com/65eb03ecb1deb509f027ecef/675c0d376ad825f0542d0eee_logo_sailer.svg"
          alt="my sailer branding"
        />
      </div>
    );
  };

  return (
    <div className="flex w-full h-screen bg-background text-foreground">
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "30%" }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Sidebar />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-grow h-full"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default ChatLayout;
