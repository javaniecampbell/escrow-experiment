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
    { id: 1, title: 'Project 1', status: 'Active', clientId: 1 },
    { id: 2, title: 'Project 2', status: 'Completed', clientId: 2 },
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

// Create a Zustand store for managing client data
const useClientStore = create((set) => ({
    clients: initialClients,
    projects: initialProjects,
    billingHistory: initialBillingHistory,
    supportMessages: initialSupportMessages,
    selectedClient: null,

    // Function to select a client
    selectClient: (clientId) => {
        set((state) => ({ selectedClient: state.clients.find((c) => c.id === clientId) }));
    },

    // Function to clear the selected client
    clearSelectedClient: () => {
        set({ selectedClient: null });
    },

    // Function to add a new client
    addClient: (newClient) => {
        set((state) => ({ clients: [...state.clients, newClient] }));
    },

    // Function to add a new project
    addProject: (newProject) => {
        set((state) => ({ projects: [...state.projects, newProject] }));
    },

    // Function to add a billing history entry
    addBillingHistoryEntry: (newEntry) => {
        set((state) => ({ billingHistory: [...state.billingHistory, newEntry] }));
    },

    // Function to add a support message
    addSupportMessage: (newMessage) => {
        set((state) => ({ supportMessages: [...state.supportMessages, newMessage] }));
    },
}));

// Create a Zustand store for managing projects
const useProjectStore = create((set) => ({
    projects: initialProjects, // Sample project data
    selectedProject: null,     // Store the selected project

    // Function to select a project
    selectProject: (projectId) => {
        set((state) => ({ selectedProject: state.projects.find((p) => p.id === projectId) }));
    },

    // Function to clear the selected project
    clearSelectedProject: () => {
        set({ selectedProject: null });
    },

    // Function to add a new project
    addProject: (newProject) => {
        set((state) => ({ projects: [...state.projects, newProject] }));
    },
}));

// Create a Zustand store for managing billing entries
const useBillingStore = create((set) => ({
    billingEntries: [],//initialBillingEntries, // Sample billing entries data

    // Function to add a new billing entry
    addBillingEntry: (newBillingEntry) => {
        set((state) => ({ billingEntries: [...state.billingEntries, newBillingEntry] }));
    },
}));

export { useProjectStore, useBillingStore };
export default useClientStore;
