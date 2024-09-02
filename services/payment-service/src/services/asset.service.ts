// services/AssetService.ts

import { Asset } from '../dtos/asset.dto';
import { ISpecification } from '../specifications/common';
import prisma from '../utils/prisma';
import { generateExpiringLink } from '../services/index'

export const AssetService = {
    releaseAsset: async (asset: Asset, milestoneId: number | string, specifications: ISpecification<Asset>[]) => {
        // Implement logic to release an asset
        // Check if the asset meets all specifications
        const isSatisfying = specifications.every((spec) => spec.isSatisfiedBy(asset));

        if (isSatisfying) {
            // // Generate an expiring link for the asset using Azure Storage
            // const blobServiceClient = BlobServiceClient.fromConnectionString("YOUR_AZURE_STORAGE_CONNECTION_STRING");
            // const containerClient = blobServiceClient.getContainerClient("assets");

            // Set the expiration time (e.g., 1 hour from now)
            const expirationTime = 60 * 60 * 1000; // 1 hour in milliseconds

            // Construct the expiring link
            const expiringLink = generateExpiringLink(asset.id, expirationTime);

            return expiringLink;
        } else {
            // Asset does not meet the criteria
            return null;
        }
    },
};