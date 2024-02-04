
export type Client = {
    id: number;
    name: string;
    email: string;
};

export type Project = {
    id: number;
    title: string;
    name?: string;
    description?: string;
    balance: number;
    inEscrow: number;
    totalPayouts: number;
    milestones: Milestone[];
    status: string;
    clientId: number;
};

export type Milestone = {
    id: number;
    projectId: number;
    name: string;
    amount: number;
    date: string | Date;
    status: string;
    payout: number;
    previewed: boolean;
    payoutDate: string | Date;
    description: string;
    digitalAssets: DigitalAsset[];
};

export type DigitalAsset = {
    id: number;
    name: string;
    url: string;
    type: string;
    milestoneId: number;
    expiryDate: string | Date;
};

export type BillingHistoryEntry = {
    id: number;
    date: string | Date;
    description: string;
    amount: number;
    status: string;
    clientId: number;
};

export type SupportMessage = {
    id: number;
    date: string | Date;
    message: string;
    clientId: number;
};
