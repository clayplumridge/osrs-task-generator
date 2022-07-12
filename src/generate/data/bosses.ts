import { QuestId } from "./quests";
import { TaskRequirements } from "./requirements";
import { TaskLength } from "@/contracts/task";

export const enum BossId {
    ChaosFanatic = "fanatic",
    GiantMole = "mole",
    Kril = "kril",
    Tempoross = "tempoross",
    Wintertodt = "wintertodt"
}

interface KillCountRanges {
    [TaskLength.Short]: [number, number];
    [TaskLength.Medium]: [number, number];
    [TaskLength.Long]: [number, number];
}

export interface BossDetails<Id extends BossId> {
    friendlyName: string;
    id: Id;
    isWilderness: boolean;
    killCountRanges: KillCountRanges;
    requirements?: TaskRequirements;
}

export type BossRecord = { [key in BossId]: BossDetails<key> };

export const StandardKillCountRanges: KillCountRanges = {
    [TaskLength.Short]: [5, 15],
    [TaskLength.Medium]: [30, 75],
    [TaskLength.Long]: [110, 150]
};

export const AllBosses: BossRecord = {
    [BossId.ChaosFanatic]: {
        friendlyName: "Chaos Fanatic",
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
        friendlyName: "Giant Mole",
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
        friendlyName: "K'ril Tsutsaroth",
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
        friendlyName: "Tempoross",
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
        friendlyName: "Wintertodt",
        id: BossId.Wintertodt,
        isWilderness: false,
        killCountRanges: StandardKillCountRanges,
        requirements: {
            skillLevels: {
                firemaking: 50
            }
        }
    }
};
