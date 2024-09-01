// NotificationCenter.js

import React from 'react';
import NotificationItem from './NotificationItem';
import { Notification } from '@/shared/app.types';

type NotificationsProps = {
  notifications: Notification[];
};


const NotificationCenter = ({ notifications }: NotificationsProps) => {
  return (
    <div className="notification-center">
      <h2>Notification Center</h2>
      <div className="notifications">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;
