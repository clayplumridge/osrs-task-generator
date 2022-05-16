import { validateTaskType } from "./validate_constraints";
import { Constraints, TaskType } from "@/contracts/task";
import { RequestContext } from "@/generate/context";
import { AllBosses } from "@/generate/data/bosses";
import { areRequirementsFulfilled } from "@/generate/data/requirements";
import { TaskGenerator } from "@/generate/index.types";

export const bossKillCountGenerator: TaskGenerator<TaskType.BossKillCount> = {
    canGenerate: (requestContext: RequestContext, constraints: Constraints) => {
        return (
            validateTaskType(constraints, TaskType.BossKillCount) &&
            Object.values(AllBosses).some(x =>
                areRequirementsFulfilled(requestContext, x.requirements)
            )
        );
    },
    generate: () => {
        return { type: TaskType.BossKillCount };
    }
};
