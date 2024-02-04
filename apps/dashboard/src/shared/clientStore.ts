// clientStore.js
import { create } from 'zustand';
import { initialClients, initialProjects, initialBillingHistory, initialSupportMessages } from './initialData';
import { Client, Project, BillingHistoryEntry, SupportMessage } from './app.types';

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
