export type HealthCheckData = {
    status?: string;
    version?: string;
    releaseId?: string;
    serviceId?: string;
    description?: string;
    uptime: number;
    responseTime: Array<number>;
    message?: string;
    timestamp: number;
    checks: any;
};

export type Client = {
    id: number | string;
    name: string;
    email: string;
};

export type Project = {
    id: number | string;
    title: string;
    name?: string;
    description?: string;
    balance: number;
    inEscrow: number;
    totalPayouts: number;
    milestones: Milestone[];
    recentActivity: string[];
    status: string;
    clientId: number;
};

export type Milestone = {
    id: number | string;
    projectId: number | string;
    name: string;
    amount: number;
    balance?: number;
    date: string | Date;
    status: string;
    payout: number;
    delivered: boolean;
    paidOut: boolean;
    previewed: boolean;
    hasPreview: boolean;
    payoutRequested?: boolean;
    payoutRequestedAt?: string | Date;
    payoutDate: string | Date;
    description: string;
    digitalAssets: DigitalAsset[];
};

export type DigitalAsset = {
    id: number | string;
    name: string;
    url: string;
    type: string;
    milestoneId: number;
    expiryDate: string | Date;
};

export type BillingHistoryEntry = {
    id: number | string;
    date: string | Date;
    description: string;
    amount: number;
    status: string;
    clientId: number;
};

export type SupportMessage = {
    id: number | string;
    date: string | Date;
    message: string;
    clientId: number;
};

export type Permission = {
    id: string;
    name: string;
    description: string;
    permissions: string[];
    subAccountId: string;
    access: boolean;
};
export type SubAccount = {
    id: string;
    name: string;
    connectAccountId: string | null;
    agencyId: string;
    subAccountLogo?: string;
    address?: string;
    SidebarOptions?: SidebarOption[];
};

export type SidebarOption = {
    id: string;
    name: string;
    icon: string;
    link: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    subAccountId: string | null;
};
export type Agency = {
    id: string;
    whiteLabel: boolean;
    name?: string;
    agencyLogo?: string;
    SubAccounts?: SubAccount[];
    SidebarOptions?: SidebarOption[];
    Permissions?: Permission[];
    address?: string;
};

export type User = {
    role?: string;
    Agency?: Agency;
    Permissions?: Permission[];
};

export type ClientId = number | string;
export type ProjectId = number | string;
export type MilestoneId = number | string;
export type DigitalAssetId = number | string;
export type SidebarOptionId = number | string;
export type BillingHistoryEntryId = number | string;
export type SupportMessageId = number | string;
export type PermissionId = number | string;
export type SubAccountId = number | string;
export type AgencyId = number | string;
export type UserId = number | string;