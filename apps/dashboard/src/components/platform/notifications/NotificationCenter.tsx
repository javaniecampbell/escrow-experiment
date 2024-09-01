// NotificationCenter.js

import React from "react";
import NotificationItem from "./NotificationItem";
import { Notification } from "@/shared/app.types";
import useStore from "@/shared/notification.store";

type NotificationsProps = {
  notifications?: Notification[];
};

const NotificationCenter = () => {
  const notifications = useStore((state) => state.notifications); // Use Zustand state
  return (
    <div className="notification-center bg-gray-100 p-4 shadow-md">
      <h2 className="text-lg font-semibold">Notification Center</h2>
      <div className="notifications  mt-4">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;
