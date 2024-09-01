// Notification.tsx

import React from "react";

type NotificationProps = {
  notification: Notification;
};

const Notification = ({ notification }: NotificationProps) => {
  return (
    <div className="notification">
      <p>{notification.message}</p>
      <small>{notification.timestamp}</small>
    </div>
  );
};

export default Notification;
