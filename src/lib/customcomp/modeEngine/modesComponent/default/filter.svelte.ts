import { computeCommandScore } from "bits-ui";


export function Filter(commandValue: string, search: string, commandKeywords?: string[]): number {
    const score = computeCommandScore(commandValue, search, commandKeywords);
    // Add custom logic here
    return score;
}