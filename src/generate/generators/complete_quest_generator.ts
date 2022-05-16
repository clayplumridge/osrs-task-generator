import { TaskType } from "@/contracts/task";
import { TaskGenerator } from "@/generate/index.types";

export const completeQuestGenerator: TaskGenerator<TaskType.CompleteQuest> = {
    canGenerate: () => true,
    generate: () => {
        return { type: TaskType.CompleteQuest };
    }
};
