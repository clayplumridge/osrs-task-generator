import { TaskType } from "@/contracts/task";
import { TaskGenerator } from "@/generate/index.types";

export const completeDiaryGenerator: TaskGenerator<TaskType.CompleteDiary> = {
    canGenerate: () => true,
    generate: () => {
        return { type: TaskType.CompleteDiary };
    }
};
