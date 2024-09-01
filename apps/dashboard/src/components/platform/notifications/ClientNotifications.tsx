// ClientNotifications.js
import React, { useState } from "react";
import NotificationCenter from "./NotificationCenter";
import { Notification } from "@/shared/app.types";
import NotificationSettings from "./NotificationSettings";

const ClientNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "New project update", timestamp: "2 hours ago" },
    { id: 2, message: "Billing reminder", timestamp: "1 day ago" },
  ]);

  // Function to simulate receiving notifications
  const receiveNotification = () => {
    // Replace with your actual notification logic
    const newNotification = {
      id: Date.now(),
      message: "New milestone added to your project!",
      timestamp: "Just now",
    };
    setNotifications([...notifications, newNotification]);
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      <button
        className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 mb-2"
        onClick={receiveNotification}
      >
        Receive Notification
      </button>
      <ul>
        {notifications.map((notification: Notification) => (
          <li key={notification.id} className="mb-2">
            {notification.message}
          </li>
        ))}
      </ul>

      <div>
        <h3 className="text-lg font-semibold mt-4">Notification Center</h3>
        <NotificationCenter notifications={notifications} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4">Notification Settings</h3>
        <NotificationSettings />
      </div>
    </div>
  );
};

export default ClientNotifications;
