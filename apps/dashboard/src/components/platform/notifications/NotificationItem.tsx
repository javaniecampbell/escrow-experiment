// Notification.tsx

import { Notification } from "@/shared/app.types";
import React from "react";

type NotificationProps = {
  notification: Notification;
};

const NotificationItem = ({ notification }: NotificationProps) => {
  return (
    <div className="notification">
      <p>{notification.message}</p>
      <small>{notification.timestamp}</small>
    </div>
  );
};

export default NotificationItem;
