import { SkillName } from "osrs-json-hiscores";
import { QuestId } from "./quests";
import { TaskRequirements } from "@/generate/util/requirements";

interface SkillDetails {
    friendlyName: string;
    id: SkillName;
    requirements?: TaskRequirements;
}

interface IdConstraint<Id extends SkillName> {
    id: Id;
}

export type SkillRecord = { [key in SkillName]?: SkillDetails };
type ConstrainedSkillRecord = SkillRecord & {
    [key in SkillName]?: IdConstraint<key>;
};

export const TrainableSkills: SkillRecord = {
    agility: {
        friendlyName: "Agility",
        id: "agility"
    },
    attack: {
        friendlyName: "Attack",
        id: "attack"
    },
    construction: {
        friendlyName: "Construction",
        id: "construction"
    },
    cooking: {
        friendlyName: "Cooking",
        id: "cooking"
    },
    crafting: {
        friendlyName: "Crafting",
        id: "crafting"
    },
    defence: {
        friendlyName: "Defence",
        id: "defence"
    },
    firemaking: {
        friendlyName: "Firemaking",
        id: "firemaking"
    },
    fishing: {
        friendlyName: "Fishing",
        id: "fishing"
    },
    fletching: {
        friendlyName: "Fletching",
        id: "fletching"
    },
    herblore: {
        friendlyName: "Herblore",
        id: "herblore",
        requirements: {
            quests: [QuestId.DruidicRitual]
        }
    },
    hunter: {
        friendlyName: "Hunter",
        id: "hunter"
    },
    magic: {
        friendlyName: "Magic",
        id: "magic"
    },
    mining: {
        friendlyName: "Mining",
        id: "mining"
    },
    prayer: {
        friendlyName: "Prayer",
        id: "prayer"
    },
    ranged: {
        friendlyName: "Ranged",
        id: "ranged"
    },
    runecraft: {
        friendlyName: "Runecrafting",
        id: "runecraft",
        requirements: {
            quests: [QuestId.RuneMysteries]
        }
    },
    slayer: {
        friendlyName: "Slayer",
        id: "slayer"
    },
    smithing: {
        friendlyName: "Smithing",
        id: "smithing"
    },
    strength: {
        friendlyName: "Strength",
        id: "strength"
    },
    thieving: {
        friendlyName: "Thieving",
        id: "thieving"
    },
    woodcutting: {
        friendlyName: "Woodcutting",
        id: "woodcutting"
    }
} satisfies ConstrainedSkillRecord;
