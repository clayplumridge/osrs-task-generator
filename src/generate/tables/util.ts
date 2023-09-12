import { random } from "lodash";
import { Constraints, TaskLength, TaskType } from "@/contracts/task";

export function generateTaskLength(constraints?: Constraints): TaskLength {
    return random(0, constraints?.requiredMaxLength ?? TaskLength.Long);
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
