import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { Fetch } from "../middlewares/Axios";
import Loader from "./ui/loader";
import { UserProps } from "../types";

interface messageProps {
  _id: string;
  owner: string;
  message: string;
  time: string;
}

interface chatProps {
  chatId: number;
  driver: UserProps;
  client: UserProps;
  messages: messageProps[];
}

export default function Chat({
  client,
  driver,
  image,
}: {
  client: string;
  driver: string;
  image: string;
}) {
  const [chat, setChat] = useState<chatProps>();
  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser();

  const owner = user?.id === client ? "client" : "driver";
  const myImage = user?.imageUrl || "";

  useEffect(() => {
    if (client && driver) {
      setLoading(true);
      Fetch.post("/chat/", { client, driver })
        .then((res) => setChat(res.data))
        .catch((err) => console.error("Chat fetch error:", err))
        .finally(() => setLoading(false));
    }
  }, [client, driver]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
        setSend(true)
      const res = await Fetch.post("/chat/message", {
        chatId: chat?.chatId,
        message: newMessage,
        owner,
      });

      setChat(res.data.chat);
      setNewMessage("");
    } catch (error) {
      console.error("Send error:", error);
    } finally{
        setSend(false)
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-20">
        <Loader />
      </div>
    );
  }

  if (!chat) return <div className="p-4">Chat mavjud emas</div>;

  return (
    <div className="p-4 border rounded w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Chat: {chat.chatId}</h2>

      <div className="space-y-3 max-h-96 bg-secondary overflow-y-auto mb-4">
        {chat.messages.map(({ time, message, owner: msgOwner, _id }) => {
          const isMe = msgOwner === owner;
          const profileImage = isMe ? myImage : image;

          return (
            <div
              key={_id}
              className={`flex items-end p-2 gap-2 ${
                isMe ? "justify-start" : "justify-end"
              }`}
            >
              {isMe && (
                <img
                  src={profileImage}
                  alt="me"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}

              <div
                className={`p-2 rounded-sm max-w-[75%] px-4 bg-card shadow ${
                  isMe
                    ? "text-left"
                    : "text-right"
                }`}
              >
                <div>{message}</div>
                <div className="text-xs mt-1">
                  {new Date(time).toLocaleTimeString()}
                </div>
              </div>

              {!isMe && (
                <img
                  src={profileImage}
                  alt="other"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 items-center">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Yozing..."
        />
        <Button onClick={sendMessage} disabled={send}>
          {send ? <Loader/> : <Send />}
        </Button>
      </div>
    </div>
  );
}
