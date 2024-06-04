// store.js
import { create } from 'zustand';
import { initialMilestones, initialProjects } from './initialData';
import { Milestone, MilestoneId, Project, ProjectId } from './app.types';


interface StoreState {
  projects: Project[];
  milestones: Milestone[];
  selectedProject: ProjectId | null;
  addProject: (project: Project) => void;
  addMilestone: (milestone: Milestone) => void;
  selectProject: (projectId: ProjectId | null) => void;
  markMilestonePreviewed: (milestoneId: MilestoneId | null) => void;
  requestPayout: (projectId: ProjectId | null) => void;
  markMilestoneDelivered: (milestoneId: MilestoneId | null) => void;
  releaseEscrow: (milestoneId: MilestoneId | null) => void;
}


const useStore = create<StoreState>((set) => ({
  projects: initialProjects ?? [],
  milestones: initialMilestones ?? [],
  selectedProject: 1 ?? null,
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  addMilestone: (milestone) => set((state) => ({ milestones: [...state.milestones, milestone] })),
  selectProject: (projectId) => set({ selectedProject: projectId }),
  markMilestonePreviewed: (milestoneId) => {
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
    console.log('requestPayout', projectId);
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id === projectId) {
          p.milestones.forEach((m) => {
            if (m.projectId === projectId) {
              m.status = 'Payout Requested';
              m.payoutRequested = true;
              m.payoutRequestedAt = new Date();
              p.balance -= m.amount;
              p.totalPayouts += m.amount;
              m.payoutDate = new Date();
              m.payout = m.amount;
              m.paidOut = true;
            }
          });
        }
        return p;
      }),
    }));
  },
  markMilestoneDelivered: (milestoneId) => {
    set((state) => ({
      milestones: state.milestones.map((milestone) => {
        if (milestone.id === milestoneId) {
          milestone.delivered = true;
        }
        return milestone;
      }),
    }));
  },
  releaseEscrow: (milestoneId) => {
    set((state) => ({
      milestones: state.milestones.map((milestone) => {
        if (milestone.id === milestoneId) {
          milestone.paidOut = true;
        }
        return milestone;
      }),
    }));
  },
}));

export default useStore;
