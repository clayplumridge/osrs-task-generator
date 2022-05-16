import { TaskRequirements } from "./requirements";
import { TaskLength } from "@/contracts/task";

export const enum QuestId {
    CooksAssistant = "cooksassistant",
    DeathPlateau = "deathplateau",
    DemonSlayer = "demonslayer",
    DragonSlayer1 = "ds1",
    DruidicRitual = "druidicritual",
    RestlessGhost = "restlessghost",
    RuneMysteries = "runemysteries",
    TrollStronghold = "trollstronghold"
}

interface QuestDetails<Id extends QuestId> {
    friendlyName: string;
    id: Id;
    isWilderness: boolean;
    length: TaskLength;
    questPoints: number;
    requirements?: TaskRequirements;
}

type QuestRecord = { [key in QuestId]: QuestDetails<key> };

export const AllQuests: QuestRecord = {
    [QuestId.CooksAssistant]: {
        friendlyName: "Cook's Assistant",
        id: QuestId.CooksAssistant,
        isWilderness: false,
        length: TaskLength.Short,
        questPoints: 1
    },
    [QuestId.DeathPlateau]: {
        friendlyName: "Death Plateau",
        id: QuestId.DeathPlateau,
        isWilderness: false,
        length: TaskLength.Short,
        questPoints: 1
    },
    [QuestId.DemonSlayer]: {
        friendlyName: "Demon Slayer",
        id: QuestId.DemonSlayer,
        isWilderness: false,
        length: TaskLength.Short,
        questPoints: 3,
        requirements: {
            minCombatLevel: 15
        }
    },
    [QuestId.DragonSlayer1]: {
        friendlyName: "Dragon Slayer I",
        id: QuestId.DragonSlayer1,
        isWilderness: false,
        length: TaskLength.Medium,
        questPoints: 2,
        requirements: {
            ironOnly: {
                skillLevels: {
                    crafting: 8,
                    smithing: 34
                }
            },
            minCombatLevel: 45,
            questPoints: 32,
            skillLevels: {
                magic: 33,
                prayer: 37
            }
        }
    },
    [QuestId.DruidicRitual]: {
        friendlyName: "Druidic Ritual",
        id: QuestId.DruidicRitual,
        isWilderness: false,
        length: TaskLength.Short,
        questPoints: 4,
        requirements: {
            minCombatLevel: 10
        }
    },
    [QuestId.RestlessGhost]: {
        friendlyName: "The Restless Ghost",
        id: QuestId.RestlessGhost,
        isWilderness: false,
        length: TaskLength.Short,
        questPoints: 1,
        requirements: {
            minCombatLevel: 10
        }
    },
    [QuestId.RuneMysteries]: {
        friendlyName: "Rune Mysteries",
        id: QuestId.RuneMysteries,
        isWilderness: false,
        length: TaskLength.Short,
        questPoints: 1
    },
    [QuestId.TrollStronghold]: {
        friendlyName: "Troll Stronghold",
        id: QuestId.TrollStronghold,
        isWilderness: false,
        length: TaskLength.Short,
        questPoints: 1,
        requirements: {
            minCombatLevel: 50,
            skillLevels: {
                agility: 15,
                prayer: 43
            }
        }
    }
};
