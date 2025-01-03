import { motion } from "framer-motion";

type MessageProps = {
  content: string;
  id: string;
  timestamp: string;
  type: string;
  user_id: string;
};

const Message = ({ message }: { message: MessageProps }) => {
  const IS_USER = message.user_id !== "bot_user";

  const messageContentRenderers: Record<
    MessageProps["type"],
    () => JSX.Element
  > = {
    text: () => <p>{message.content}</p>,
    image: () => (
      <img
        className="rounded-md max-w-sm"
        src={message.content}
        alt={message.content}
      />
    ),
    audio: () => <audio src={message.content} controls className="max-w-xs" />,
  };

  const renderMessageContent =
    messageContentRenderers[message.type] || (() => null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${IS_USER ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          IS_USER ? "bg-[#b5e3fd] text-black" : "bg-[#38b5fd13] text-white"
        }`}
      >
        {renderMessageContent()}
      </div>
    </motion.div>
  );
};

export default Message;
