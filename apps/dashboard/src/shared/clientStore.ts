// clientStore.js
import { create } from 'zustand';
import { initialClients, initialProjects, initialBillingHistory, initialSupportMessages } from './initialData';
import { Client, Project, BillingHistoryEntry, SupportMessage, ProjectId, ClientId, BillingHistoryEntryId } from './app.types';

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
    // might need the projectId & milestoneId
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
    selectProject: (projectId: ProjectId) => void;
    clearSelectedProject: () => void;
    addProject: (newProject: Project) => void;
}

// Create a Zustand store for managing projects
const useProjectStore = create<ProjectStoreState>((set) => ({
    projects: initialProjects, // Sample project data
    selectedProject: null, // Store the selected project

    // Function to select a project
    selectProject: (projectId: ProjectId) => {
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
    addBillingEntry: (newBillingEntry: BillingHistoryEntry) => void;
    updateBillingEntry: (updatedEntry: BillingHistoryEntry) => void;
    setSelectedBillingEntry: (billingEntry: BillingHistoryEntry) => void;
    clearSelectedBillingEntry: () => void;
    deleteBillingEntry: (billingEntryId: BillingHistoryEntryId) => void;
    fetchBillingEntries: (cLientId: ClientId) => void;
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

    // Function to update the selected billing entry, finds it in the history, and updates it to the billing entries
    updateBillingEntry: (updatedEntry: BillingHistoryEntry) => {
        set((state) => ({
            billingEntries: state.billingEntries.map((entry) =>
                entry.id === updatedEntry.id ? updatedEntry : entry
            ),
        }));
    },


    // Function to set the selected billing entry
    setSelectedBillingEntry: (billingEntry: BillingHistoryEntry) =>
        set({ selectedBillingEntry: billingEntry }),

    // Function to clear the selected billing entry
    clearSelectedBillingEntry: () => set({ selectedBillingEntry: null }),
    fetchBillingEntries: async (clientId: ClientId) => {
        try {

            // Make an API call to fetch billing entries for the client
            const response = await fetch('/api/billing-entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clientId }),
            });

            const entries = await response.json();
            set({ billingEntries: entries });
        } catch (error) {
            set((state) => ({ billingEntries: state.billingEntries }));
            console.error('Error fetching billing entries:', error);
        }
    },
    // Function to delete a billing entry
    deleteBillingEntry: (billingEntryId: BillingHistoryEntryId) => {
        set((state) => ({
            billingEntries: state.billingEntries.filter((entry) => entry.id !== billingEntryId),
        }));
    },
}));

export { useProjectStore, useBillingStore };
export default useClientStore;
