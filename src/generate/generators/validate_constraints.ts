import { Constraints, TaskType } from "@/contracts/task";

export function validateTaskType(
    constraints: Constraints,
    myTaskType: TaskType
): boolean {
    return (
        constraints.allowedTypes === undefined ||
        constraints.allowedTypes.some(x => x === myTaskType)
    );
}

interface HasIsWilderness {
    isWilderness: boolean;
}

export function validateWilderness(
    constraints: Constraints,
    taskDetails: HasIsWilderness
): boolean {
    if (taskDetails.isWilderness) {
        return (
            constraints.wilderness === "allow" ||
            constraints.wilderness === "require"
        );
    } else {
        return (
            constraints.wilderness === "allow" ||
            constraints.wilderness === "disallow"
        );
    }
}
