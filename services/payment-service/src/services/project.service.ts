
// services/ProjectService.ts

import prisma from '../utils/prisma';


export const ProjectService = {
    getAllProjects: () => {
        return prisma.project.findMany();
    },
    getProjectById: (id: number) => {
        return prisma.project.findUnique({
            where: {
                projectId: id,
            },
        });
    },
};