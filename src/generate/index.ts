import { RequestContext } from "./context";
import { TaskGenerator } from "./index.types";
import { Constraints, TaskType } from "@/contracts/task";
import { withTimings } from "@/util/timing";

export const generate = withTimings(
    (requestContext: RequestContext, constraints?: Constraints) => {
        const legalGenerators = getLegalGenerators(requestContext, constraints);
        const generator =
            legalGenerators[
                requestContext.services.rng(legalGenerators.length - 1)
            ];
        return generator.generate(requestContext, constraints);
    },
    "generate"
);

export function getLegalGenerators(
    requestContext: RequestContext,
    constraints?: Constraints
): TaskGenerator<TaskType>[] {
    const allGenerators = requestContext.services.generators;

    return Object.values(allGenerators).filter(x =>
        x.canGenerate(requestContext, constraints)
    );
}
