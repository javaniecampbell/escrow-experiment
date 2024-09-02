// models/Iteration.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new iteration in the database
export async function createIteration(
  feedbackId: string,
  milestoneId: string,
  description: string,
  status: string
) {
  try {
    const iteration = await prisma.iteration.create({
      data: {
        feedback: {
          connect: {
            id: feedbackId,
          },
        },
        milestone: {
          connect: {
            milestoneId: milestoneId,
          },
        },
        description,
        status,
      },
    });
    return iteration;
  } catch (error) {
    console.error("Error creating iteration:", error);
    throw error;
  }
}

export const IterationService = {
  // Get all iterations for a feedback
  async getAllIterationsForFeedback(feedbackId: string) {
    try {
      const iterations = await prisma.iteration.findMany({
        where: {
          feedbackId,
        },
        include: {
          feedback: true,
        },
      });
      return iterations;
    } catch (error) {
      console.error("Error getting iterations:", error);
      throw error;
    }
  },
};
