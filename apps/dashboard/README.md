## Escrow Platform

### User Onboarding
An app for freelancers to allow customers to create project requests after onboarding includes signing up and accepting terms & conditions. A customer will then create a project with uploading project idea, in written form or audio recording, answering questionnaire of wants. When the users submit the project requests,AI will generate the functional and non-functional requirements, plan for project, breakdown the project into user stories.

The customer will review various generate documents with a limited iteration. Once the customer has completed review, the proposal will be geneated with the project details to be confirmed by accepting the proposal by signing the document. Once the proposal is accepted, then the customer will be notified that the proposal was accepted and contract will be generated with the project details from the proposal and sent to the customer & paying to confirm the deposit specified by the freelancer or quote generated. If the contract is signed and the payment is made the project details will be added to the dashboard for both freelancers and client.

If the proposal is not accepted, the customer will asked to provide feedback on why the proposal was not accepted. The customer can then choose to resubmit the project request with feedback changes or close the project.

If the proposal is not accepted & confirmed, the customer will be notified and the project will be closed. The freelancer will then be notified that the project was not accepted and the project will be removed from the dashboard.

On the dashboard of the freelancer, the project request go through several phases to be completed and the customer can track the progress. The project will be broken down into milestones, and the customer can release the payment for each milestone upon completion. Each milestone allows for the customer to request changes known as iterations at limit of 3.

At end of each milestone, the freelancer will submit the work and the customer can either accept or request changes at 3 iteration per miletone. If more iterations are requested, the customer will have to buy additional iteration credits for that milestone.

Each miletone will have the ability to be preview the work via an expiry link, leave feedback, and accept or request changes.

Once all milestones are completed, the customer can release the final payment.

### Key Features

The dashboard will have the following features:

- Project overview with status and milestones
- Milestone management with iteration tracking
- a feature to preview work via expiry links
- ability to leave feedback on milestones
- functionality to accept or request changes on milestones, with a limit of 3 iterations per milestone
- logic to handle additional iteration credits if more than 3 iterations are requested
- methods to manage type of digital assets preview and expiry
- release payment for a milestone
- release final payment upon completion of all milestones

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
