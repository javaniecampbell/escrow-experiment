// NotificationSettings.tsx

import React, { useState } from "react";
import { NotificationPreference } from "@/shared/app.types";

const NotificationSettings = () => {
  const [notificationPreferences, setNotificationPreferences] =
    useState<NotificationPreference>({
      projectUpdates: true,
      billingReminders: true,
      newMessages: true,
      emailUpdates: false,
    });

  const togglePreference = (type: keyof NotificationPreference) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [type]: !notificationPreferences[type],
    });
  };

  return (
    <div className="notification-settings">
      <h2>Notification Settings</h2>
      <label>
        <input
          type="checkbox"
          checked={notificationPreferences.projectUpdates}
          onChange={() => togglePreference("projectUpdates")}
        />{" "}
        Project Updates
      </label>
      <label>
        <input
          type="checkbox"
          checked={notificationPreferences.billingReminders}
          onChange={() => togglePreference("billingReminders")}
        />{" "}
        Billing Reminders
      </label>
      <label>
        <input
          type="checkbox"
          checked={notificationPreferences.newMessages}
          onChange={() => togglePreference("newMessages")}
        />{" "}
        New Messages
      </label>
      <label>
        <input
          type="checkbox"
          checked={notificationPreferences.emailUpdates}
          onChange={() => togglePreference("emailUpdates")}
        />{" "}
        Receive Email Updates
      </label>
    </div>
  );
};

export default NotificationSettings;
