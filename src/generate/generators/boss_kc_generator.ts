import { generateTaskLength } from "./util";
import { validateTaskType, validateWilderness } from "./validate_constraints";
import { Constraints, TaskType } from "@/contracts/task";
import { RequestContext } from "@/generate/context";
import { areRequirementsFulfilled } from "@/generate/data/requirements";
import { TaskGenerator } from "@/generate/index.types";

export const bossKillCountGenerator: TaskGenerator<TaskType.BossKillCount> = {
    canGenerate: (context: RequestContext, constraints: Constraints) => {
        return (
            validateTaskType(constraints, TaskType.BossKillCount) &&
            Object.values(context.data.bosses).some(
                x =>
                    areRequirementsFulfilled(context, x.requirements) &&
                    validateWilderness(constraints, x)
            )
        );
    },
    generate: (context: RequestContext) => {
        const validBosses = Object.values(context.data.bosses).filter(x =>
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
