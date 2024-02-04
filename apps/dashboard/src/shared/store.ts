// store.js
import { create } from 'zustand';
import { initialMilestones, initialProjects } from './initialData';
import { Milestone, Project } from './app.types';


interface StoreState {
  projects: Project[];
  milestones: Milestone[];
  selectedProject: number | string | null;
  addProject: (project: Project) => void;
  addMilestone: (milestone: Milestone) => void;
  selectProject: (projectId: string | number) => void;
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
