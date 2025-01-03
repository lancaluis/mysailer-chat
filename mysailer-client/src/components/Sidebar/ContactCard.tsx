import { motion } from "framer-motion";
import { User } from "lucide-react";

type ContactCardProps = {
  name: string;
  handleClick: (e: React.FormEvent) => Promise<void> | void;
};

export const ContactCard = ({ name, handleClick }: ContactCardProps) => {
  return (
    <motion.div
      whileHover={{ backgroundColor: "#38b5fd6c", borderRadius: 4 }}
      className="p-2 cursor-pointer flex items-center"
      onClick={handleClick}
    >
      <div className="flex items-center flex-grow">
        <div
          className="w-10 h-10 rounded-full bg-[#6bc9ff]
                    mr-3 flex items-center justify-center text-[#1F3D55]"
        >
          <User className="h-6 w-6" />
        </div>
        <h3 className="flex-grow flex text-white">{name}</h3>
      </div>
    </motion.div>
  );
};
