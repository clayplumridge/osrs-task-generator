import { Clues, Stats } from "osrs-json-hiscores";
import { RequestContext } from "@/generate/context";
import { BossRecord } from "@/generate/data/bosses";
import { QuestId, QuestRecord } from "@/generate/data/quests";
import { SkillRecord } from "@/generate/data/skills";

export function createTestRequestContext(
    mutator?: (context: RequestContext) => RequestContext
): RequestContext {
    const base: RequestContext = {
        data: {
            bosses: {} as BossRecord,
            quests: {} as QuestRecord,
            skills: {} as SkillRecord
        },
        user: {
            completedQuests: new Set<QuestId>(),
            gameMode: "main",
            stats: createTestStats()
        }
    };

    return mutator ? mutator(base) : base;
}

const clueTypes = [
    "all",
    "beginner",
    "easy",
    "medium",
    "hard",
    "elite",
    "master"
] as const;

const baseClues = clueTypes.reduce((prev, curr) => {
    prev[curr] = { rank: 0, score: 0 };
    return prev;
}, {} as unknown as Clues);

export function createTestStats(mutator?: (stats: Stats) => Stats): Stats {
    const base: Partial<Stats> = {
        clues: baseClues
    };

    return mutator
        ? mutator(base as unknown as Stats)
        : (base as unknown as Stats);
}
