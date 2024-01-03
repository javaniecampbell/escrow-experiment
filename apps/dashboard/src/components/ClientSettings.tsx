// ClientSettings.js
import React, { useState } from "react";

const ClientSettings = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailPreferences, setEmailPreferences] = useState(true);

  const handleChangePassword = () => {
    // Implement password change functionality here
    // You can use state and form inputs to change the password
  };

  const handleEmailPreferences = () => {
    // Implement email preferences toggle functionality here
    // You can use state to manage email preferences
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
      <div className="mb-4">
        <p className="text-md font-semibold">Change Password</p>
        <input
          type="password"
          placeholder="Current Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded w-full"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded w-full mt-2"
        />
        <button
          className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 mt-2"
          onClick={handleChangePassword}
        >
          Change Password
        </button>
      </div>
      <div className="mb-4">
        <p className="text-md font-semibold">Email Preferences</p>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={emailPreferences}
            onChange={() => handleEmailPreferences(!emailPreferences)}
            className="form-checkbox h-5 w-5 text-blue-500"
          />
          <span>Receive email notifications</span>
        </label>
      </div>
    </div>
  );
};

export default ClientSettings;
