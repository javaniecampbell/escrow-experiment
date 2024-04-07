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
    name: string;
    description: string;
    // Add other relevant properties
}

interface Requirement {
    type: 'functional' | 'non-functional';
    description: string;
    // Add other relevant properties
}

interface Epic {
    name: string;
    description: string;
    // Add other relevant properties
}

interface Feature {
    name: string;
    description: string;
    epicId: string;
    // Add other relevant properties
}

interface Scenario {
    name: string;
    description: string;
    featureId: string;
    // Add other relevant properties
}

interface UserStory {
    title: string;
    description: string;
    epicId: string;
    // Add other relevant properties
}

interface AcceptanceCriteria {
    description: string;
    userStoryId: string;
    // Add other relevant properties
}

interface Task {
    title: string;
    description: string;
    userStoryId: string;
    // Add other relevant properties
}