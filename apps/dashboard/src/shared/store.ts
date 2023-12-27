// store.js
import create from 'zustand';

const useStore = create((set) => ({
  projects: [],
  milestones: [],
  selectedProject: null,
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  addMilestone: (milestone) => set((state) => ({ milestones: [...state.milestones, milestone] })),
  selectProject: (projectId) => set({ selectedProject: projectId }),
}));

export default useStore;
