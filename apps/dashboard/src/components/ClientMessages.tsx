// ClientMessages.js
import React, { useState } from 'react';
import useStore from '@/shared/store';

const ClientMessages = () => {
  const { clientProjects } = useStore();
  const [selectedProject, setSelectedProject] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (selectedProject && message) {
      // Update messages for the selected project
      const updatedProjects = clientProjects.map((project) => {
        if (project.id === selectedProject) {
          return {
            ...project,
            messages: [...project.messages, message],
          };
        }
        return project;
      });
      setMessages([...messages, message]);
      setSelectedProject('');
      setMessage('');
      // Update the state with the updated projects
      // Replace this line with your actual state management logic
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Messages</h2>
      <div className="mb-4">
        <h3 className="text-md font-semibold">Select Project</h3>
        <select
          className="border rounded px-2 py-1 w-full"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="" disabled>
            Select Project
          </option>
          {clientProjects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      {selectedProject && (
        <div className="mb-4">
          <h3 className="text-md font-semibold">Send Message</h3>
          <textarea
            className="border rounded w-full p-2"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button
            className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 mt-2"
            onClick={handleSendMessage}
          >
            Send Message
          </button>
        </div>
      )}
      {messages.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-semibold">Messages</h3>
          <ul className="list-disc pl-6">
            {messages.map((msg, index) => (
              <li key={index} className="mb-2">
                {msg}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClientMessages;
