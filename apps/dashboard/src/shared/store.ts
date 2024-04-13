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
  markMilestonePreviewed: (milestoneId: number | string) => void;
  requestPayout: (projectId: number | string | null) => void;
}

const useStore = create<StoreState>((set) => ({
  projects: initialProjects ?? [],
  milestones: initialMilestones ?? [],
  selectedProject: 1 ?? null,
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  addMilestone: (milestone) => set((state) => ({ milestones: [...state.milestones, milestone] })),
  selectProject: (projectId) => set({ selectedProject: projectId }),
  markMilestonePreviewed: (milestoneId: number | string) => {
    set((state) => ({
      milestones: state.milestones.map((milestone) => {
        if (milestone.id === milestoneId) {
          // p.forEach((m) => {
          // if (m.id === milestoneId) {
          milestone.status = 'Previewed';
          // }
          // });
        }
        return milestone;
      }),
    }));
  },
  requestPayout: (projectId) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id === projectId) {
          p.milestones.forEach((m) => {
            if (m.projectId === projectId) {
              m.status = 'Payout Requested';
            }
          });
        }
        return p;
      }),
    }));
  },
}));

export default useStore;
