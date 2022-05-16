import { RequestContext } from "./context";
import { Constraints, TaskType, TaskTypeMap } from "@/contracts/task";

export interface TaskGenerator<T extends TaskType> {
    canGenerate(
        requestContext: RequestContext,
        constraints: Constraints
    ): boolean;
    generate(
        requestContext: RequestContext,
        constraints: Constraints
    ): TaskTypeMap[T];
}
