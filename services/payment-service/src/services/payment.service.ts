// services/PaymentService.ts

import { PayoutSpecification, MilestoneAmountGreaterThanThreshold, ProjectStatusAllowsPayout } from '../specifications/payout.specification';
import prisma from '../utils/prisma';
import stripeClient from '../utils/stripe';
import { NotificationService } from './notification.service';

const ProjectStatusAllowsPayoutSpec = new ProjectStatusAllowsPayout(
);
const payoutThreshold = 1000;
const MilestoneAmountGreaterThanThresholdSpec = new MilestoneAmountGreaterThanThreshold(payoutThreshold);
const complexSpecification = new PayoutSpecification().and(ProjectStatusAllowsPayoutSpec).and(MilestoneAmountGreaterThanThresholdSpec);
export const PaymentService = {
    getPaymentsForProject: (projectId: number) => {
        return prisma.payment.findMany({
            where: {
                projectId,
            },
        });
    },
    requestPayout: async (milestoneId: number) => {
        try {
            // Fetch the milestone by ID
            const milestone = await prisma.milestone.findUnique({
                where: {
                    milestoneId: milestoneId,
                },
                include: {
                    project: true,
                }
            });

            if (!milestone) {
                throw new Error('Milestone not found');
            }
            // if (milestone.status !== 'completed') {
            //     throw new Error('Milestone is not completed');
            // }

            // if (milestone.paymentStatus !== 'pending') {
            //     throw new Error('Milestone payment status is not pending');
            // }

            // if (milestone?.amount === 0) {
            //     throw new Error('Milestone amount is 0');
            // }

            // Check if the milestone satisfies the specification
            if (!complexSpecification.isSatisfiedBy(milestone)) {
                throw new Error('Milestone does not meet payout criteria');
            }


            // Calculate the amount to be paid out (you may have your own logic here)
            const payoutAmount = Number(milestone?.amount ?? 0) - Number(milestone?.paidAmount ?? 0);

            // Create a payout request with Stripe Connect
            const payout = await stripeClient.payouts.create({
                amount: Math.round(payoutAmount * 100), // Amount in cents
                currency: 'usd', // Change to your desired currency
                method: 'standard', // You can use 'instant' for instant payouts
                destination: milestone?.project?.stripeAccountId!, // Stripe account ID of the recipient
            });

            // Update the milestone status and payment status in the database
            await prisma.milestone.update({
                where: {
                    milestoneId: milestoneId,
                },
                data: {
                    status: 'paid', // Update the status to 'paid'
                },
            });

            // You can also update the payment status in the database if needed

            // Send a notification to inform the user about the payout request
            // You can use your notification service here
            const notification = {
                type: 'payout_request',
                message: `Payout request for milestone ${milestone.milestoneName} has been initiated.`,
                recipientId: milestone?.project?.clientId!, // ID of the client/user
            };

            // Implement logic to send the notification to the user
            // Example: notificationService.sendNotification(notification);
            NotificationService.sendNotification(notification);
            return payout;
        } catch (error) {
            throw new Error(`Error requesting payout: ${error.message}`);
        }
    },
};