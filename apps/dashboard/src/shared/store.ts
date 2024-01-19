// store.js
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


const initialMilestones = [{
  id: 1,
  projectId: 1,
  name: 'Milestone 1',
  amount: 100,
  date: '2023-01-15',
  status: 'Active',
  description: 'Milestone 1 description',
  digitalAssets: [{
    id: 1,
    name: 'Milestone 1 Digital Asset 1',
    url: 'https://www.example.com/asset1.pdf',
    type: 'PDF',
    milestoneId: 1,
    expiryDate: '2023-01-15'
  }, {
    id: 2,
    name: 'Milestone 1 Digital Asset 2',
    url: 'https://www.example.com/asset2.pdf',
    type: 'PDF',
    milestoneId: 1,
    expiryDate: '2023-01-15'
  }]
}]

interface StoreState {
  projects: any[];
  milestones: any[];
  selectedProject: any | null;
  addProject: (project: any) => void;
  addMilestone: (milestone: any) => void;
  selectProject: (projectId: any) => void;
}

const useStore = create<StoreState>((set) => ({
  projects: initialProjects ?? [],
  milestones: initialMilestones ?? [],
  selectedProject: 1?? null,
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  addMilestone: (milestone) => set((state) => ({ milestones: [...state.milestones, milestone] })),
  selectProject: (projectId) => set({ selectedProject: projectId }),
}));

export default useStore;
