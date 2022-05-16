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
