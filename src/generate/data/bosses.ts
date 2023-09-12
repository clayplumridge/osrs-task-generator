import { FORMATTED_BOSS_NAMES } from "osrs-json-hiscores";
import { QuestId } from "./quests";
import { TaskLength } from "@/contracts/task";
import { TaskRequirements } from "@/generate/util/requirements";

export const enum BossId {
    ChaosFanatic = "chaosFanatic",
    GiantMole = "giantMole",
    Kril = "krilTsutsaroth",
    Tempoross = "tempoross",
    Wintertodt = "wintertodt"
}

interface KillCountRanges {
    [TaskLength.Short]: [number, number];
    [TaskLength.Medium]: [number, number];
    [TaskLength.Long]: [number, number];
}

export interface BossDetails {
    friendlyName: string;
    id: BossId;
    isWilderness: boolean;
    killCountRanges: KillCountRanges;
    requirements?: TaskRequirements;
}

interface IdConstraint<Id extends BossId> {
    id: Id;
}

export type BossRecord = { [key in BossId]: BossDetails };
type ConstrainedBossRecord = BossRecord & {
    [key in BossId]: IdConstraint<key>;
};

export const StandardKillCountRanges: KillCountRanges = {
    [TaskLength.Short]: [5, 15],
    [TaskLength.Medium]: [30, 75],
    [TaskLength.Long]: [110, 150]
};

export const AllBosses: BossRecord = {
    [BossId.ChaosFanatic]: {
        friendlyName: FORMATTED_BOSS_NAMES[BossId.ChaosFanatic],
        id: BossId.ChaosFanatic,
        isWilderness: true,
        killCountRanges: StandardKillCountRanges,
        requirements: {
            skillLevels: {
                defence: 70,
                prayer: 37,
                ranged: 75
            }
        }
    },
    [BossId.GiantMole]: {
        friendlyName: FORMATTED_BOSS_NAMES[BossId.GiantMole],
        id: BossId.GiantMole,
        isWilderness: false,
        killCountRanges: StandardKillCountRanges,
        requirements: {
            minCombatLevel: 85,
            skillLevels: {
                prayer: 43
            }
        }
    },
    [BossId.Kril]: {
        friendlyName: FORMATTED_BOSS_NAMES[BossId.Kril],
        id: BossId.Kril,
        isWilderness: false,
        killCountRanges: StandardKillCountRanges,
        requirements: {
            minCombatLevel: 100,
            quests: [QuestId.DeathPlateau],
            skillLevels: {
                hitpoints: 70,
                prayer: 43
            }
        }
    },
    [BossId.Tempoross]: {
        friendlyName: FORMATTED_BOSS_NAMES[BossId.Tempoross],
        id: BossId.Tempoross,
        isWilderness: false,
        killCountRanges: StandardKillCountRanges,
        requirements: {
            skillLevels: {
                fishing: 35
            }
        }
    },
    [BossId.Wintertodt]: {
        friendlyName: FORMATTED_BOSS_NAMES[BossId.Wintertodt],
        id: BossId.Wintertodt,
        isWilderness: false,
        killCountRanges: StandardKillCountRanges,
        requirements: {
            skillLevels: {
                firemaking: 50
            }
        }
    }
} satisfies ConstrainedBossRecord;
