import { Gamemode, getStats, Stats } from "osrs-json-hiscores";
import { AllBosses, BossRecord } from "./data/bosses";
import { AllQuests, QuestId, QuestRecord } from "./data/quests";
import { SkillRecord, TrainableSkills } from "./data/skills";
import { bossKillCountGenerator } from "./generators/boss_kc_generator";
import { completeQuestGenerator } from "./generators/complete_quest_generator";
import { TaskGenerator } from "./index.types";
import { TaskType } from "@/contracts/task";

type GeneratorMap = Partial<{ [key in TaskType]: TaskGenerator<key> }>;

const allGenerators: GeneratorMap = {
    [TaskType.BossKillCount]: bossKillCountGenerator,
    [TaskType.CompleteQuest]: completeQuestGenerator
    // [TaskType.BossUntilUnique]: bossUntilUniqueGenerator,
    // [TaskType.TrainSkill]: trainSkillGenerator
};

export interface RequestContext {
    data: {
        bosses: BossRecord;
        quests: QuestRecord;
        skills: SkillRecord;
    };
    services: {
        generators: GeneratorMap;
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
        data: {
            bosses: AllBosses,
            quests: AllQuests,
            skills: TrainableSkills
        },
        services: { generators: allGenerators },
        user: { completedQuests: new Set(), gameMode: player.mode, stats }
    };
}
