// NotificationSettings.tsx

import React, { useState } from "react";
import { NotificationPreference } from "@/shared/app.types";
import useStore from "@/shared/notification.store";

const NotificationSettings = () => {
  // const [notificationPreferences, setNotificationPreferences] =
  //   useState<NotificationPreference>({
  //     projectUpdates: true,
  //     billingReminders: true,
  //     newMessages: true,
  //     emailUpdates: false,
  //   });

  // const togglePreference = (type: keyof NotificationPreference) => {
  //   setNotificationPreferences({
  //     ...notificationPreferences,
  //     [type]: !notificationPreferences[type],
  //   });
  // };
  const notificationPreferences = useStore(
    (state) => state.notificationPreferences
  );
  const togglePreference = useStore((state) => state.togglePreference);

  return (
    <div className="notification-settings bg-gray-100 p-4 shadow-md">
      <h2 className="text-lg font-semibold">Notification Settings</h2>
      <div className="mt-4">
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={notificationPreferences.projectUpdates}
            onChange={() => togglePreference("projectUpdates")}
          />{" "}
          Project Updates
        </label>
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={notificationPreferences.billingReminders}
            onChange={() => togglePreference("billingReminders")}
          />{" "}
          Billing Reminders
        </label>
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={notificationPreferences.newMessages}
            onChange={() => togglePreference("newMessages")}
          />{" "}
          New Messages
        </label>
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={notificationPreferences.emailUpdates}
            onChange={() => togglePreference("emailUpdates")}
          />{" "}
          Receive Email Updates
        </label>
      </div>
    </div>
  );
};

export default NotificationSettings;
