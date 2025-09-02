
//Manual ranking for optimal layout

import { command } from "$app/server";
import { computeCommandScore } from "bits-ui";

export function Filter(commandValue: string, search: string, commandKeywords?: string[]): number {
    // Add custom logic here
    if(commandValue == "Return"){
        return 0.1
    } else if(commandValue == "Translation"){
        return 1;
    } else if (commandValue == "Preview"){
        return 0.2;
    } else if(commandValue == "Translate"){
        return 0.3;
    }
    const score = computeCommandScore(commandValue, search, commandKeywords)
    return score;
}