import { random } from "lodash";
import { Gamemode, getStats, Stats } from "osrs-json-hiscores";
import { QuestId } from "./data/quests";
import { bossKillCountGenerator } from "./generators/boss_kc_generator";
import { TaskGenerator } from "./index.types";
import { TaskType } from "@/contracts/task";

type GeneratorMap = Partial<{ [key in TaskType]: TaskGenerator<key> }>;

const allGenerators: GeneratorMap = {
    [TaskType.BossKillCount]: bossKillCountGenerator
    // [TaskType.BossUntilUnique]: bossUntilUniqueGenerator,
    // [TaskType.TrainSkill]: trainSkillGenerator
};

export interface RequestContext {
    services: {
        generators: GeneratorMap;
        rng: typeof random;
    };
    user: {
        completedQuests: Set<QuestId>;
        gameMode: Gamemode;
        stats: Stats;
    };
}

export async function createRequestContext(
    playerName: string
): Promise<RequestContext> {
    const player = await getStats(playerName);
    const stats = player[player.mode];

    if (stats === undefined) {
        throw new Error(`Unable to retrieve stats for player ${playerName}`);
    }

    return {
        services: { generators: allGenerators, rng: random },
        user: { completedQuests: new Set(), gameMode: player.mode, stats }
    };
}
