import { useState, useEffect } from "react";
import * as Toast from "@radix-ui/react-toast";
import { io } from "socket.io-client";

import {
  Message,
  Event,
  MessageType,
  NotificationTitleMap,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const renderNotification = (notification: Message | null) => {
  if (!notification) {
    return null;
  }

  return (
    <>
      <Toast.Title className="font-bold">
        {NotificationTitleMap[notification.type]}
      </Toast.Title>
      <Toast.Description className="break-words">
        {notification.type === MessageType.BRIDGE &&
          `${notification?.amount} ETH will be transferred from ${notification?.from} on the ${notification?.chain} chain soon`}
        {notification.type === MessageType.SUCCESS && (
          <a href={notification?.txLink}>
            Transaction link:{" "}
            <span className="text-blue-500">{notification?.txLink}</span>
          </a>
        )}
        {notification.type === MessageType.ERROR &&
          `Error: ${notification?.message}`}
      </Toast.Description>
    </>
  );
};

export const Notifications = () => {
  const [open, setOpen] = useState(false);
  const [curMessage, setCurMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");

    newSocket.on(Event.BRIDGE_EVENT, (message) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });
    newSocket.on(Event.SUCCESS_EVENT, (message) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });
    newSocket.on(Event.ERROR_EVENT, (message) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!open) {
      if (curMessage) {
        setCurMessage(null);
      }
      if (messages.length) {
        setCurMessage(messages[0]);
        setMessages((prev) => prev.slice(1));
        setOpen(true);
      }
    }
  }, [open, curMessage, messages]);

  return (
    <Toast.Provider>
      {curMessage && (
        <Toast.Root
          className={cn(
            "border border-gray-200 shadow-md p-6 rounded-md",
            curMessage.type === MessageType.BRIDGE && "bg-orange-100",
            curMessage.type === MessageType.SUCCESS && "bg-green-100",
            curMessage.type === MessageType.ERROR && "bg-red-100"
          )}
          open={open}
          onOpenChange={setOpen}
        >
          {renderNotification(curMessage)}
          <Toast.Close className="text-gray-500 hover:text-gray-700 absolute top-1 right-2">
            ✕
          </Toast.Close>
        </Toast.Root>
      )}
      <Toast.Viewport className="fixed bottom-4 right-4 w-96 max-w-full" />
    </Toast.Provider>
  );
};
