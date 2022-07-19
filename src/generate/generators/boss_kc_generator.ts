import { random } from "lodash";
import { generateTaskLength } from "./util";
import { validateTaskType, validateWilderness } from "./validate_constraints";
import { TaskType } from "@/contracts/task";
import { areRequirementsFulfilled } from "@/generate/data/requirements";
import { TaskGenerator } from "@/generate/index.types";

export const bossKillCountGenerator: TaskGenerator<TaskType.BossKillCount> = {
    canGenerate: (context, constraints) => {
        return (
            validateTaskType(TaskType.BossKillCount, constraints) &&
            Object.values(context.data.bosses).some(
                x =>
                    areRequirementsFulfilled(context, x.requirements) &&
                    validateWilderness(x, constraints)
            )
        );
    },
    generate: context => {
        const validBosses = Object.values(context.data.bosses).filter(x =>
            areRequirementsFulfilled(context, x.requirements)
        );

        const selectedBoss = validBosses[random(1, validBosses.length) - 1];
        const taskLength = generateTaskLength();
        const [taskMinKills, taskMaxKills] =
            selectedBoss.killCountRanges[taskLength];
        const taskKillCount = random(taskMinKills, taskMaxKills);

        return {
            boss: selectedBoss,
            kills: taskKillCount,
            type: TaskType.BossKillCount
        };
    }
};
