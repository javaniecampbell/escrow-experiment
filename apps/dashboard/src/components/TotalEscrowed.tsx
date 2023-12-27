// TotalEscrowed.js
import React from 'react';
import useStore from '@/shared/store';

const TotalEscrowed = () => {
  const { selectedProject, milestones } = useStore();

  // Calculate the total escrowed amount
  const totalEscrowed = milestones
    .filter((milestone) => milestone.projectId === selectedProject)
    .reduce((sum, milestone) => sum + milestone.amount, 0);

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-2">Total Escrowed</h2>
      {selectedProject ? (
        <>
          <p className="text-gray-700">Total Escrowed Amount: ${totalEscrowed}</p>
          <div className="mt-2">
            <h3 className="text-md font-semibold">Milestones:</h3>
            <ul className="list-disc ml-4">
              {milestones
                .filter((milestone) => milestone.projectId === selectedProject)
                .map((milestone) => (
                  <li key={milestone.id}>
                    {milestone.name} - ${milestone.amount}
                  </li>
                ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="text-gray-700">Select a project to view the total escrowed amount.</p>
      )}
    </div>
  );
};

export default TotalEscrowed;
