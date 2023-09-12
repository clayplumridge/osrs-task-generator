import { Constraints, TaskType } from "@/contracts/task";

export function satisfiesWildernessConstraint(
    constraint: Constraints["wilderness"],
    taskDetails: { isWilderness: boolean }
) {
    switch (constraint) {
        case undefined:
        case "allow":
            return true;
        case "require":
            return taskDetails.isWilderness;
        case "disallow":
            return !taskDetails.isWilderness;
    }
}

export function isTaskTypeAllowed(
    taskType: TaskType,
    constraints?: Constraints
) {
    if (
        constraints?.allowedTypes &&
        !constraints.allowedTypes.some(tt => tt === taskType)
    ) {
        return false;
    }

    return true;
}
