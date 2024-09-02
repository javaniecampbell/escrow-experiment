// routes/iteration.ts

import express, { Request, Response } from "express";
import { createIteration } from "../services/iteration.service";

const router = express.Router();

// POST /api/iteration
router.post("/api/iteration", async (req: Request, res: Response) => {
  try {
    const { feedbackId, description, status, milestoneId } = req.body;

    // Validate input data (add your validation logic here)

    // Create a new iteration
    const iteration = await createIteration(
      feedbackId,
      milestoneId,
      description,
      status
    );

    res
      .status(201)
      .json({ message: "Iteration created successfully", iteration });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to create iteration" });
  }
});

export default router;
