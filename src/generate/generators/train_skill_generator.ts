import { TaskType } from "@/contracts/task";
import { TaskGenerator } from "@/generate/index.types";

export const trainSkillGenerator: TaskGenerator<TaskType.TrainSkill> = {
    canGenerate: () => true,
    generate: () => {
        return { type: TaskType.TrainSkill };
    }
};
