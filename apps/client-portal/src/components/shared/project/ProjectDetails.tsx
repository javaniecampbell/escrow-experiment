import React from "react";

function ProjectDetails() {
  return (
    <div>
      ProjectDetails
      {/* <!-- milestones.html -->
<!-- This page should display project details and allow users to add milestones -->

<!-- ... HTML for displaying project details ... --> */}
      <h2>Add a Milestone</h2>
      <form
        id="addMilestoneForm"
        action="http://localhost:3000/api/milestones/create-milestone"
        method="POST"
      >
        <label htmlFor="milestoneName">Milestone Name:</label>
        <input type="text" id="milestoneName" required />

        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" required />

        <button type="submit">Add Milestone</button>
      </form>
    </div>
  );
}

export default ProjectDetails;
