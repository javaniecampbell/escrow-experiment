// models/Invoice.ts

import { generateInvoiceNo } from "../utils/id.generator";
import prisma from "../utils/prisma";

// Create a new invoice in the database
export async function createInvoice(
  projectId: string | null,
  milestoneId: string | null,
  clientId: string,
  amount: number
) {
  try {
    if (!projectId && !milestoneId) {
      throw new Error(
        "Either projectId or milestoneId must be provided for invoice creation."
      );
    }
    if (projectId && milestoneId) {
      throw new Error(
        "Both projectId and milestoneId cannot be provided for invoice creation."
      );
    }
    if (projectId && !milestoneId) {
      const project = await prisma.project.findUnique({
        where: {
          projectId: projectId,
        },
      });
      if (!project) {
        throw new Error("Project not found.");
      }
    }
    if (milestoneId && !projectId) {
      const milestone = await prisma.milestone.findUnique({
        where: {
          milestoneId: milestoneId,
        },
        include: {
          project: true,
        },
      });
      if (!milestone) {
        throw new Error("Milestone not found.");
      }
      if (!milestone.project) {
        throw new Error("Project not found.");
      }
      projectId = milestone.project.projectId;
    }
    if (!projectId || !clientId) {
      throw new Error(
        "Both projectId and clientId must be provided for invoice creation."
      );
    }
    if (amount <= 0) {
      throw new Error("Amount must be a positive number.");
    }
    let invoiceNo = generateInvoiceNo();
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNo,
        projectId,
        milestoneId,
        clientId,
        amount,
        status: "Unpaid", // You can set the initial status as 'Unpaid'
      },
    });
    return invoice;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
}
