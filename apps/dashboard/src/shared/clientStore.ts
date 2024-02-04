// clientStore.js
import { create } from 'zustand';


// Sample data for clients
const initialClients = [
    { id: 1, name: 'Client 1', email: 'client1@example.com' },
    { id: 2, name: 'Client 2', email: 'client2@example.com' },
    // Add more clients as needed
];

// Sample data for projects
const initialProjects = [
    { id: 1, title: 'Project 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', balance: 100, inEscrow: 100, totalPayouts: 0, milestones: [], status: 'Active', clientId: 1 },
    { id: 2, title: 'Project 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', balance: 0, inEscrow: 0, totalPayouts: 100, milestones: [], status: 'Completed', clientId: 2 },
    // Add more projects as needed
];

// Sample data for billing history
const initialBillingHistory = [
    { id: 1, date: '2023-01-15', description: 'Service fee', amount: 100, status: 'Paid', clientId: 1 },
    { id: 2, date: '2023-02-20', description: 'Service fee', amount: 80, status: 'Paid', clientId: 2 },
    // Add more billing history entries as needed
];

// Sample data for support messages
const initialSupportMessages = [
    { id: 1, date: '2023-01-10', message: 'I need help with my project.', clientId: 1 },
    { id: 2, date: '2023-02-05', message: 'I have a question about billing.', clientId: 2 },
    // Add more support messages as needed
];

//
interface ClientStoreState {
    clients: Client[];
    projects: Project[];
    billingHistory: BillingHistoryEntry[];
    supportMessages: SupportMessage[];
    selectedClient: Client | null;
    selectClient: (clientId: number) => void;
    clearSelectedClient: () => void;
    addClient: (newClient: Client) => void;
    addProject: (newProject: Project) => void;
    addBillingHistoryEntry: (newBillingHistoryEntry: BillingHistoryEntry) => void;
    addSupportMessage: (newSupportMessage: SupportMessage) => void;
    markMilestonePreviewed: (milestoneId: number | string) => void;
    releaseEscrow: (milestoneId: number | string) => void;
}

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
    date: string;
    status: string;
    payout: number;
    previewed: boolean;
    payoutDate: Date;
    description: string;
    digitalAssets: DigitalAsset[];
};

export type DigitalAsset = {
    id: number;
    name: string;
    url: string;
    type: string;
    milestoneId: number;
    expiryDate: string;
};

export type BillingHistoryEntry = {
    id: number;
    date: string;
    description: string;
    amount: number;
    status: string;
    clientId: number;
};

export type SupportMessage = {
    id: number;
    date: string;
    message: string;
    clientId: number;
};


// Create a Zustand store for managing client data
const useClientStore = create<ClientStoreState>((set) => ({
    clients: initialClients ?? [],
    projects: initialProjects ?? [],
    billingHistory: initialBillingHistory ?? [],
    supportMessages: initialSupportMessages ?? [], //
    selectedClient: initialClients[0] ?? null,

    // Function to select a client
    selectClient: (clientId: number) => {
        set((state) => ({
            selectedClient: state.clients.find((c) => c.id === clientId),
        }));
    },

    // Function to clear the selected client
    clearSelectedClient: () => {
        set({ selectedClient: null });
    },

    // Function to add a new client
    addClient: (newClient: Client) => {
        set((state) => ({ clients: [...state.clients, newClient] }));
    },

    // Function to add a new project
    addProject: (newProject: Project) => {
        set((state) => ({ projects: [...state.projects, newProject] }));
    },

    // Function to add a billing history entry
    addBillingHistoryEntry: (newEntry: BillingHistoryEntry) => {
        set((state) => ({ billingHistory: [...state.billingHistory, newEntry] }));
    },

    // Function to add a support message
    addSupportMessage: (newMessage: SupportMessage) => {
        set((state) => ({
            supportMessages: [...state.supportMessages, newMessage],
        }));
    },
    markMilestonePreviewed: (milestoneId: number | string) => {
        set((state) => ({
            projects: state.projects.map((p) => {
                if (p.id === milestoneId) {
                    p.milestones.forEach((m) => {
                        if (m.id === milestoneId) {
                            m.status = 'Previewed';
                        }
                    });
                }
                return p;
            }),
        }));
    },
    releaseEscrow: (milestoneId: number | string) => {
        set((state) => ({
            projects: state.projects.map((p) => {
                if (p.id === milestoneId) {
                    p.milestones.forEach((m) => {
                        if (m.id === milestoneId) {
                            m.status = 'Completed';
                            p.balance -= m.amount;
                            p.totalPayouts += m.amount;
                        }
                    });
                }
                return p;
            }),
        }));
    },
}));

interface ProjectStoreState {
    projects: Project[];
    selectedProject: Project | null;
}

// Create a Zustand store for managing projects
const useProjectStore = create<ProjectStoreState>((set) => ({
    projects: initialProjects, // Sample project data
    selectedProject: null, // Store the selected project

    // Function to select a project
    selectProject: (projectId: number) => {
        set((state) => ({
            selectedProject: state.projects.find((p) => p.id === projectId),
        }));
    },

    // Function to clear the selected project
    clearSelectedProject: () => {
        set({ selectedProject: null });
    },

    // Function to add a new project
    addProject: (newProject: Project) => {
        set((state) => ({ projects: [...state.projects, newProject] }));
    },
}));


interface BillingStoreState {
    billingEntries: BillingHistoryEntry[];
    selectedBillingEntry: BillingHistoryEntry | null;
}

// Create a Zustand store for managing billing entries
const useBillingStore = create<BillingStoreState>((set) => ({
    billingEntries: [], //initialBillingEntries, // Sample billing entries data
    selectedBillingEntry: null, // Initialize selectedBillingEntry as null

    // Function to add a new billing entry
    addBillingEntry: (newBillingEntry: BillingHistoryEntry) => {
        set((state) => ({
            billingEntries: [...state.billingEntries, newBillingEntry],
        }));
    },

    // Function to set the selected billing entry
    setSelectedBillingEntry: (billingEntry: BillingHistoryEntry) =>
        set({ selectedBillingEntry: billingEntry }),

    // Function to clear the selected billing entry
    clearSelectedBillingEntry: () => set({ selectedBillingEntry: null }),
}));

export { useProjectStore, useBillingStore };
export default useClientStore;
