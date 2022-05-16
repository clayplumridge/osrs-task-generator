import { TaskType } from "@/contracts/task";
import { TaskGenerator } from "@/generate/index.types";

export const bossUntilUniqueGenerator: TaskGenerator<TaskType.BossUntilUnique> =
    {
        canGenerate: () => true,
        generate: () => {
            return { type: TaskType.BossUntilUnique };
        }
    };
