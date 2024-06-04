import { Milestone } from "./app.types";

const threeDaysFromNow = new Date();
threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

// generate date 10 days from today
const tenDaysFromNow = new Date();
tenDaysFromNow.setDate(tenDaysFromNow.getDate() + 10);


// generate date random days from today

const randomDaysFromNow = new Date();
randomDaysFromNow.setDate(randomDaysFromNow.getDate() + Math.floor(Math.random() * 10));

// Sample data for clients
export const initialClients = [
    { id: 1, name: 'Client 1', email: 'client1@example.com' },
    { id: 2, name: 'Client 2', email: 'client2@example.com' },
    // Add more clients as needed
];

// Sample data for milestones
export const initialMilestones = [{
    id: 1,
    projectId: 1,
    name: 'Milestone 1',
    amount: 100,
    date: threeDaysFromNow.toDateString(),
    status: 'Active',
    payout: 0,

    balance: 100,
    delivered: false,
    paidOut: false,
    previewed: false,
    hasPreview: true,
    payoutDate: threeDaysFromNow.toDateString(),
    description: 'Milestone 1 description',
    digitalAssets: [{
        id: 1,
        name: 'Milestone 1 Digital Asset 1',
        url: 'https://www.example.com/asset1.pdf',
        type: 'PDF',
        milestoneId: 1,
        expiryDate: tenDaysFromNow.toDateString()
    }, {
        id: 2,
        name: 'Milestone 1 Digital Asset 2',
        url: 'https://www.example.com/asset2.pdf',
        type: 'PDF',
        milestoneId: 1,
        expiryDate: tenDaysFromNow.toDateString()
    }]
}, {
    id: 2,
    projectId: 1,
    name: 'Milestone 2',
    amount: 100,
    date: threeDaysFromNow.toDateString(),
    status: 'Active',
    payout: 100,

    balance: 100,
    delivered: true,
    paidOut: true,
    previewed: true,
    hasPreview: true,
    payoutDate: threeDaysFromNow.toDateString(),
    description: 'Milestone 1 description',
    digitalAssets: [{
        id: 3,
        name: 'Milestone 1 Digital Asset 1',
        url: 'https://www.example.com/asset1.pdf',
        type: 'PDF',
        milestoneId: 2,
        expiryDate: tenDaysFromNow.toDateString()
    }, {
        id: 4,
        name: 'Milestone 1 Digital Asset 2',
        url: 'https://www.example.com/asset2.pdf',
        type: 'PDF',
        milestoneId: 2,
        expiryDate: tenDaysFromNow.toDateString()
    }]
}] satisfies Milestone[];
// Sample data for projects
export const initialProjects = [
    { id: 1, title: 'Project 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', balance: 100, inEscrow: 100, totalPayouts: 0, milestones: initialMilestones ?? [], recentActivity: [], status: 'Active', clientId: 1, messages: [], },
    { id: 2, title: 'Project 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', balance: 0, inEscrow: 0, totalPayouts: 100, milestones: [], recentActivity: [], status: 'Completed', clientId: 2, messages: [], },
    // Add more projects as needed
];
// Sample data for billing history
export const initialBillingHistory = [
    { id: 1, date: '2023-01-15', description: 'Service fee', amount: 100, status: 'Paid', clientId: 1 },
    { id: 2, date: '2023-02-20', description: 'Service fee', amount: 80, status: 'Paid', clientId: 2 },
    // Add more billing history entries as needed
];
// Sample data for support messages
export const initialSupportMessages = [
    { id: 1, date: '2023-01-10', message: 'I need help with my project.', clientId: 1 },
    { id: 2, date: '2023-02-05', message: 'I have a question about billing.', clientId: 2 },
    // Add more support messages as needed
];


const sideBarItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: 'dashboard',
        link: '/agency/dashboard'
    },
    {
        id: 2,
        title: 'Projects',
        icon: 'projects',
        link: '/agency/projects'
    },
    // generate all other items based on the data in this file
    {
        id: 3,
        title: 'Clients',
        icon: 'clients',
        link: '/agency/clients'
    },
    {
        id: 4,
        title: 'Billing',
        icon: 'billing',
        link: '/agency/billing'
    },
    {
        id: 5,
        title: 'Support',
        icon: 'support',
        link: '/agency/support'
    },
    {
        id: 6,
        title: 'Settings',
        icon: 'settings',
        link: '/agency/settings'
    }
];