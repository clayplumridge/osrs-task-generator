import { Gamemode, getStats, Stats } from "osrs-json-hiscores";
import { AllBosses, BossRecord } from "./data/bosses";
import { AllQuests, QuestId, QuestRecord } from "./data/quests";
import { SkillRecord, TrainableSkills } from "./data/skills";
import { withTimings } from "@/util/timing";

export interface RequestContext {
    data: {
        bosses: BossRecord;
        quests: QuestRecord;
        skills: SkillRecord;
    };
    user: {
        completedQuests: Set<QuestId>;
        gameMode: Gamemode;
        stats: Stats;
    };
}

export const createRequestContext = withTimings(
    createRequestContextInternal,
    "createRequestContext"
);

async function createRequestContextInternal(
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
        user: { completedQuests: new Set(), gameMode: player.mode, stats }
    };
}
