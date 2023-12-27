// clientStore.js
import { create } from 'zustand';

// Initial sample data for clients
const initialClients = [
    { id: 1, name: 'Client 1', email: 'client1@example.com' },
    { id: 2, name: 'Client 2', email: 'client2@example.com' },
    // Add more clients as needed
];

// Create a Zustand store for managing client data
const useClientStore = create((set) => ({
    clients: initialClients,
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
}));

export default useClientStore;
