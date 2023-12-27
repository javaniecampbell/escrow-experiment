import React, { useState } from 'react';

const CreateProjectForm = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to create a new project
      const response = await fetch('/create-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName, description }),
      });

      const data = await response.json();
      console.log('Project created:', data);
      // You can redirect the user to another page or update the UI here
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-2">Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="projectName" className="block text-gray-700">Project Name:</label>
          <input
            type="text"
            id="projectName"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description:</label>
          <textarea
            id="description"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProjectForm;
