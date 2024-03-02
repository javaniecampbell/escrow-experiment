// ClientProfile.js
import React, { useState } from "react";

const ClientEditProfile = () => {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [address, setAddress] = useState("123 Main St, City, Country");
  const [phone, setPhone] = useState("+1 (123) 456-7890");
  const [company, setCompany] = useState("ABC Corp");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Replace with your actual profile update logic
    if (password === confirmPassword) {
      console.log("Updating profile...");
      console.log("Full Name:", fullName);
      console.log("Email:", email);
      console.log("Address:", address);
      console.log("Phone:", phone);
      console.log("Company:", company);
      console.log("Password:", password);
      // Update the user's profile
    } else {
      console.error("Password and Confirm Password do not match.");
    }
  };
  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Profile</h2>
      <div className="mb-4">
        <label className="text-md font-semibold" htmlFor="fullName">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          className="border rounded px-2 py-1 w-full"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="text-md font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="border rounded px-2 py-1 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="text-md font-semibold" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          type="text"
          className="border rounded px-2 py-1 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="text-md font-semibold" htmlFor="company">
          Company
        </label>
        <input
          id="company"
          type="text"
          className="border rounded px-2 py-1 w-full"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="text-md font-semibold" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          type="text"
          className="border rounded px-2 py-1 w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="text-md font-semibold" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="border rounded px-2 py-1 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="text-md font-semibold" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="border rounded px-2 py-1 w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button
        className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
        onClick={handleUpdateProfile}
      >
        Update Profile
      </button>
    </div>
  );
};

export default ClientEditProfile;
