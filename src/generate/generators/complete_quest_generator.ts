import { random } from "lodash";
import { validateTaskType, validateWilderness } from "./validate_constraints";
import { TaskType } from "@/contracts/task";
import { areRequirementsFulfilled } from "@/generate/data/requirements";
import { TaskGenerator } from "@/generate/index.types";

export const completeQuestGenerator: TaskGenerator<TaskType.CompleteQuest> = {
    canGenerate: (context, constraints) => {
        return (
            validateTaskType(TaskType.CompleteQuest, constraints) &&
            Object.values(context.data.quests).some(
                x =>
                    areRequirementsFulfilled(context, x.requirements) &&
                    validateWilderness(x, constraints)
            )
        );
    },
    generate: context => {
        const validQuests = Object.values(context.data.quests).filter(x =>
            areRequirementsFulfilled(context, x.requirements)
        );

        const selectedQuest = validQuests[random(validQuests.length) - 1];

        return { quest: selectedQuest, type: TaskType.CompleteQuest };
    }
};
