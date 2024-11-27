export function daysAgo(from: Date, to?: Date): number {
    to = to ?? new Date();
    const diff = to.getTime() - from.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}