import { RequestContext } from "./context";
import { TaskGenerator } from "./index.types";
import { Constraints, Task, TaskType } from "@/contracts/task";

export function generate(
    requestContext: RequestContext,
    constraints: Constraints
): Task {
    const legalGenerators = getLegalGenerators(requestContext, constraints);
    const generator =
        legalGenerators[
            requestContext.services.rng(legalGenerators.length - 1)
        ];
    return generator.generate(requestContext, constraints);
}

export function getLegalGenerators(
    requestContext: RequestContext,
    constraints: Constraints
): TaskGenerator<TaskType>[] {
    const allGenerators = requestContext.services.generators;

    return Object.values(allGenerators).filter(x =>
        x.canGenerate(requestContext, constraints)
    );
}
