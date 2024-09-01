// Notification.tsx

import { Notification } from "@/shared/app.types";
import React from "react";
import useStore from "@/shared/notification.store";
type NotificationProps = {
  notification: Notification;
};

const NotificationItem = ({ notification }: NotificationProps) => {
  const removeNotification = useStore((state) => state.removeNotification); // Use Zustand action

  const handleRemove = () => {
    removeNotification(notification.id); // Use Zustand action
  };

  return (
    <div className="bg-white p-4 shadow-md mb-4 notification">
      <p>{notification.message}</p>
      <small>{notification.timestamp}</small>
      <button
        className="bg-red-500 text-white py-1 px-2 mt-2 rounded hover:bg-red-600"
        onClick={handleRemove}
      >
        Dismiss
      </button>
    </div>
  );
};

export default NotificationItem;
