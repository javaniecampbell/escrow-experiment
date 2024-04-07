export class ProjectBreakdown {
    project: Project;
    requirements: Requirement[];
    epics: Epic[];
    features: Feature[];
    scenarios: Scenario[];
    userStories: UserStory[];
    acceptanceCriteria: AcceptanceCriteria[];
    tasks: Task[];

    constructor(project: Project) {
        this.project = project;
        this.requirements = [];
        this.epics = [];
        this.features = [];
        this.scenarios = [];
        this.userStories = [];
        this.acceptanceCriteria = [];
        this.tasks = [];
    }

    addRequirement(requirement: Requirement): void {
        this.requirements.push(requirement);
    }

    addEpic(epic: Epic): void {
        this.epics.push(epic);
    }

    addFeature(feature: Feature): void {
        this.features.push(feature);
    }

    addScenario(scenario: Scenario): void {
        this.scenarios.push(scenario);
    }

    addUserStory(userStory: UserStory): void {
        this.userStories.push(userStory);
    }

    addAcceptanceCriteria(acceptanceCriteria: AcceptanceCriteria): void {
        this.acceptanceCriteria.push(acceptanceCriteria);
    }

    addTask(task: Task): void {
        this.tasks.push(task);
    }
}

// Data models
interface Project {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    customer: Customer;
    freelancer: Freelancer;
    status: 'pending' | 'active' | 'completed' | 'cancelled';
  }
  
  interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
  }
  
  interface Freelancer {
    id: string;
    name: string;
    email: string;
    skills: string[];
  }
  
  interface Requirement {
    id: string;
    type: 'functional' | 'non-functional';
    description: string;
    priority: 'high' | 'medium' | 'low';
    projectId: string;
  }
  
  interface Epic {
    id: string;
    name: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    projectId: string;
  }
  
  interface Feature {
    id: string;
    name: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    epicId: string;
    projectId: string;
  }
  
  interface Scenario {
    id: string;
    name: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    featureId: string;
    projectId: string;
  }
  
  interface UserStory {
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    epicId: string;
    projectId: string;
  }
  
  interface AcceptanceCriteria {
    id: string;
    description: string;
    userStoryId: string;
  }
  
  interface Task {
    id: string;
    title: string;
    description: string;
    status: 'not started' | 'in progress' | 'completed';
    priority: 'high' | 'medium' | 'low';
    assignedTo: string;
    dueDate: Date;
    userStoryId: string;
    projectId: string;
  }