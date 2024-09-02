// routes/iteration.ts

import express, { Request, Response } from "express";
import {
  calculateTotalIterations,
  createIteration,
} from "../services/iteration.service";
import { calculateIterationBilling } from "../services/billing.service";
import { createInvoice } from "../services/invoice.service";

const router = express.Router();

// POST /api/iteration
router.post("/api/iteration", async (req: Request, res: Response) => {
  try {
    const { feedbackId, description, status, milestoneId } = req.body;

    // Get the client ID from the request (add your authentication logic here)
    const clientId = "your-client-id"; // Replace with actual client ID
    // Validate input data (add your validation logic here)

    // Create a new iteration
    const iteration = await createIteration(
      feedbackId,
      milestoneId,
      description,
      status
    );

    // Check if additional billing is required (adjust the threshold as needed)
    const iterationCount = await calculateTotalIterations(feedbackId); // Implement this function
    const billingThreshold = 10; // Adjust as needed
    if (iterationCount >= billingThreshold) {
      const totalAmount = calculateIterationBilling(iterationCount);
      // Create an invoice for the additional iterations
      await createInvoice(null, milestoneId, clientId, totalAmount);
    }

    res
      .status(201)
      .json({ message: "Iteration created successfully", iteration });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to create iteration" });
  }
});

export default router;
