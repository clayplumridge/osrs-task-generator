import { Constraints, TaskType } from "@/contracts/task";

export function validateTaskType(
    myTaskType: TaskType,
    constraints?: Constraints
): boolean {
    return (
        constraints === undefined ||
        constraints.allowedTypes === undefined ||
        constraints.allowedTypes.some(x => x === myTaskType)
    );
}

interface HasIsWilderness {
    isWilderness: boolean;
}

export function validateWilderness(
    taskDetails: HasIsWilderness,
    constraints?: Constraints
): boolean {
    if (constraints?.wilderness === undefined) {
        return true;
    }

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
