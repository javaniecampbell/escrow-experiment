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
        // Validate input
        if (!project || !customer || !freelancer) {
            throw new Error('Project, customer, and freelancer are required');
        }

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
        // Validate input
        if (!requirement || !requirement.type || !requirement.description || !requirement.priority) {
            throw new Error('Requirement must have type, description, and priority');
        }

        this.requirements.push(requirement);
        requirement.project = this.project;
        this.project.requirements.push(requirement);
    }

    addEpic(epic: Epic): void {
        // Validate input
        if (!epic || !epic.name || !epic.description || !epic.priority) {
            throw new Error('Epic must have name, description, and priority');
        }

        this.epics.push(epic);
        epic.project = this.project;
        this.project.epics.push(epic);
    }

    addFeature(feature: Feature): void {
        // Validate input
        if (!feature || !feature.name || !feature.description || !feature.priority || !feature.epicId) {
            throw new Error('Feature must have name, description, priority, and an epic ID');
        }

        this.features.push(feature);
        feature.project = this.project;
        const epic = this.epics.find((e) => e.id === feature.epicId);
        if (!epic) {
            throw new Error(`Epic with ID ${feature.epicId} not found`);
        }
        feature.epic = epic;
        feature.epic.features.push(feature);
        this.project.epics.find((e) => e.id === feature.epicId)?.features.push(feature);
    }

    addScenario(scenario: Scenario): void {
        // Validate input
        if (!scenario || !scenario.name || !scenario.description || !scenario.priority || !scenario.featureId) {
            throw new Error('Scenario must have name, description, priority, and a feature ID');
        }

        this.scenarios.push(scenario);
        scenario.project = this.project;
        const feature = this.features.find((f) => f.id === scenario.featureId);
        if (!feature) {
            throw new Error(`Feature with ID ${scenario.featureId} not found`);
        }
        scenario.feature = feature;
        scenario.feature.scenarios.push(scenario);

        const epic = this.project.epics.find((e) => e.id === feature.epicId);
        const epicFeature = epic?.features.find((f) => f.id === scenario.featureId);
        epicFeature?.scenarios.push(scenario);
    }

    addUserStory(userStory: UserStory): void {
        // Validate input
        if (!userStory || !userStory.title || !userStory.description || !userStory.priority || !userStory.featureId) {
            throw new Error('User story must have title, description, priority, and a feature ID');
        }

        this.userStories.push(userStory);
        userStory.project = this.project;

        const feature = this.features.find((f) => f.id === userStory.featureId);
        if (!feature) {
            throw new Error(`Feature with ID ${userStory.featureId} not found`);
        }
        feature.userStories.push(userStory);
        userStory.feature = feature;

        const projectEpic = this.project.epics.find((e) => e.id === feature.epicId);
        const epicFeature = projectEpic?.features.find((f) => f.id === userStory.featureId);

        if (!epicFeature) {
            throw new Error(`Feature with ID ${userStory.featureId} not found in epic with ID ${feature.epicId}`);
        }
        epicFeature.userStories.push(userStory);
    }

    addAcceptanceCriteria(acceptanceCriteria: AcceptanceCriteria): void {
        // Validate input
        if (!acceptanceCriteria || !acceptanceCriteria.description || !acceptanceCriteria.userStoryId) {
            throw new Error('Acceptance criteria must have a description and a user story ID');
        }


        this.acceptanceCriteria.push(acceptanceCriteria);
        const userStory = this.userStories.find((us) => us.id === acceptanceCriteria.userStoryId);
        if (!userStory) {
            throw new Error(`User story with ID ${acceptanceCriteria.userStoryId} not found`);
        }
        acceptanceCriteria.userStory = userStory;
        acceptanceCriteria.userStory.acceptanceCriteria.push(acceptanceCriteria);
    }

    addTask(task: Task): void {
        // Validate input
        if (!task || !task.title || !task.description || !task.status || !task.priority || !task.assignedTo || !task.dueDate || !task.userStoryId) {
            throw new Error('Task must have title, description, status, priority, assigned to, due date, and a user story ID');
        }

        this.tasks.push(task);
        const userStory = this.userStories.find((us) => us.id === task.userStoryId);
        if (!userStory) {
            throw new Error(`User story with ID ${task.userStoryId} not found`);
        }

        userStory.tasks.push(task);
        task.userStory = userStory;
        // add task to user stories to project
        // get the epic first
        const projectEpic = this.project.epics.find((e) => e.id === userStory.feature.epicId);
        // get the feature
        const epicFeature = projectEpic?.features.find((f) => f.id === userStory.featureId);
        // get the user story
        const featureUserStory = epicFeature?.userStories.find((us) => us.id === task.userStoryId);
        // add the task to the user story
        if (!featureUserStory) {
            throw new Error(`User story with ID ${task.userStoryId} not found in feature with ID ${userStory.featureId}`);
        }
        featureUserStory.tasks.push(task);
        task.project = this.project;
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
    featureId: string;
    feature: Feature;
    acceptanceCriteria: AcceptanceCriteria[];
    tasks: Task[];
    projectId: Readonly<string>;
    epicId: Readonly<string>;
    project: Readonly<Project>;
    epic: Readonly<Epic>;

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