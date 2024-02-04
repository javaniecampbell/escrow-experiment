// store.js
import { create } from 'zustand';
import { initialMilestones, initialProjects } from './initialData';


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
  selectedProject: 1 ?? null,
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  addMilestone: (milestone) => set((state) => ({ milestones: [...state.milestones, milestone] })),
  selectProject: (projectId) => set({ selectedProject: projectId }),
}));

export default useStore;
