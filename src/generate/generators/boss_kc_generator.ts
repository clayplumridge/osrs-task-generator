import { generateTaskLength } from "./util";
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
    generate: (context: RequestContext) => {
        const validBosses = Object.values(AllBosses).filter(x =>
            areRequirementsFulfilled(context, x.requirements)
        );

        const selectedBoss =
            validBosses[context.services.rng(validBosses.length) - 1];
        const taskLength = generateTaskLength(context);
        const [taskMinKills, taskMaxKills] =
            selectedBoss.killCountRanges[taskLength];
        const taskKillCount = context.services.rng(taskMinKills, taskMaxKills);

        return {
            boss: selectedBoss,
            kills: taskKillCount,
            type: TaskType.BossKillCount
        };
    }
};
