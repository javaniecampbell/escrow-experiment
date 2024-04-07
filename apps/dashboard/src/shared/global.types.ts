export class ProjectBreakdown {
    project: Project;
    customer: Customer;
    freelancer: Freelancer;
    requirements: Requirement[];
    epics: Epic[];
    features: Feature[];
    scenarios: Scenario[];
    userStories: UserStory[];
    acceptanceCriteria: AcceptanceCriteria[];
    tasks: Task[];

    constructor(project: Project, customer: Customer, freelancer: Freelancer) {
        this.project = project;
        this.customer = customer;
        this.freelancer = freelancer;
        this.requirements = [];
        this.epics = [];
        this.features = [];
        this.scenarios = [];
        this.userStories = [];
        this.acceptanceCriteria = [];
        this.tasks = [];

        // Add project to customer and freelancer
        this.customer.projects.push(project);
        this.freelancer.projects.push(project);
    }

    addRequirement(requirement: Requirement): void {
        this.requirements.push(requirement);
        requirement.project = this.project;
        this.project.requirements.push(requirement);
    }

    addEpic(epic: Epic): void {
        this.epics.push(epic);
        epic.project = this.project;
        this.project.epics.push(epic);
    }

    addFeature(feature: Feature): void {
        this.features.push(feature);
        feature.project = this.project;
        feature.epic = this.epics.find((e) => e.id === feature.epicId);
        this.project.features.push(feature);
        feature.epic.features.push(feature);
    }

    addScenario(scenario: Scenario): void {
        this.scenarios.push(scenario);
        scenario.project = this.project;
        scenario.feature = this.features.find((f) => f.id === scenario.featureId);
        this.project.scenarios.push(scenario);
        scenario.feature.scenarios.push(scenario);
    }

    addUserStory(userStory: UserStory): void {
        this.userStories.push(userStory);
        userStory.project = this.project;
        userStory.epic = this.epics.find((e) => e.id === userStory.epicId);
        userStory.feature = this.features.find((f) => f.id === userStory.featureId);
        this.project.userStories.push(userStory);
        userStory.epic.userStories.push(userStory);
        userStory.feature.userStories.push(userStory);
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
    requirements: Requirement[];
    epics: Epic[];
}

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    projects: Project[];
}

interface Freelancer {
    id: string;
    name: string;
    email: string;
    skills: string[];
    projects: Project[];
}

interface Requirement {
    id: string;
    type: 'functional' | 'non-functional';
    description: string;
    priority: 'high' | 'medium' | 'low';
    projectId: string;
    project: Project;
}

interface Epic {
    id: string;
    name: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    projectId: string;
    project: Project;
    features: Feature[];
}

interface Feature {
    id: string;
    name: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    epicId: string;
    projectId: string;
    epic: Epic;
    project: Project;
    scenarios: Scenario[];
    userStories: UserStory[];
}

interface Scenario {
    id: string;
    name: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    featureId: string;
    projectId: string;
    feature: Feature;
    project: Project;
}

interface UserStory {
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    epicId: string;
    projectId: string;
    epic: Epic;
    feature: Feature;
    project: Project;
    acceptanceCriteria: AcceptanceCriteria[];
    tasks: Task[];
}

interface AcceptanceCriteria {
    id: string;
    description: string;
    userStoryId: string;
    userStory: UserStory;
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
    userStory: UserStory;
    project: Project;
}