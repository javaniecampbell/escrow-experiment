import { PrismaClient } from "@prisma/client";
import { Asset } from "../dtos/asset.dto";
import Specification from "./common";

// Define a specification for asset type
export class AssetTypeSpecification extends Specification<Asset> {
    constructor(private expectedType: string) {
        super();
    }

    isSatisfiedBy(asset: Asset): boolean {
        return asset.type === this.expectedType;
    }
}

// Define a specification for milestone criteria
export class MilestoneCriteriaSpecification extends Specification<Asset> {
    constructor(private milestoneId: string, private prisma: PrismaClient) {
        super();
    }

    async isSatisfiedBy(asset: Asset): Promise<boolean> {
        // Implement your criteria here, e.g., check if milestone criteria are met
        const milestone = await this.prisma.milestone.findUnique({
            where: { milestoneId: Number(this.milestoneId) },
        });

        if (!milestone) {
            return false;
        }

        // Implement your criteria logic based on milestone data
        // For example, check if the milestone date is within a certain range
        return milestone.dueDate !== null && milestone?.dueDate >= new Date("2023-01-01");
    }
}