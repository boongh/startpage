import { computeCommandScore } from "bits-ui";

const TestSnippetsID = [
    "1TOOrDm23jUBrekvGZOHf4A8B126cuNh",
    "cxW0Ecdm2NYCiba71hB1yN0dga4M9I6h",
    "bHKZYTBQexgAnkKCF6GRrB40mWY3ygMO",
    "a61tgs9SUA9AWWAmJO55sN9XahhXAIeT",
    "r3OKTJlnVSGtqygUi8k6HBXzlq57IXvg"
]

export function Filter(commandValue: string, search: string, commandKeywords?: string[]): number {
    const score = computeCommandScore(commandValue, search, commandKeywords);
    // Add custom logic here

    //ID for test snippet to make sure it can't possibly repeat
    if(TestSnippetsID.includes(commandValue)){
        return 1;
    }
    return score;
}