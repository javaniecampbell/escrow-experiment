// ClientNotifications.js
import React, { useState } from 'react';

const ClientNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Function to simulate receiving notifications
  const receiveNotification = () => {
    // Replace with your actual notification logic
    const newNotification = {
      id: Date.now(),
      message: 'New milestone added to your project!',
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
        {notifications.map((notification) => (
          <li key={notification.id} className="mb-2">
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientNotifications;
