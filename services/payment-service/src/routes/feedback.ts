// routes/feedback.ts

import express, { Request, Response } from "express";
import prisma from "../utils/prisma";

const router = express.Router();
/**
 * Endponts for Digital Assets management
 * @param {Tracer} tracer OpenTelemetry Tracer
 * @returns router
 */
export default ({ tracer }) => {
  // POST /api/feedback
  router.post("/api/feedback", async (req: Request, res: Response) => {
    try {
      const { description, feedbackType, additionalIterations, milestoneId } =
        req.body;

      // Validate input data (add your validation logic here)
      if (!description || !feedbackType) {
        return res
          .status(400)
          .json({ error: "Description and feedback type are required" });
      }
      if (feedbackType !== "bug" && feedbackType !== "feature") {
        return res.status(400).json({ error: "Invalid feedback type" });
      }
      if (additionalIterations && typeof additionalIterations !== "boolean") {
        return res
          .status(400)
          .json({ error: "Invalid additional iterations value" });
      }
      // Create a new feedback record in the database
      const feedback = await prisma.feedback.create({
        data: {
          description,
          type: feedbackType,
          additionalIterations,
          milestoneId: "",
        },
      });

      res.status(201).json({ message: "Feedback submitted successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to submit feedback" });
    }
  });
  return router;
};
