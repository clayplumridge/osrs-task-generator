import { SkillName } from "osrs-json-hiscores";
import { QuestId } from "./quests";
import { RequestContext } from "@/generate/context";
import { calculateCombatLevel } from "@/util/osrs";

export interface TaskRequirements extends BaseTaskRequirements {
    ironOnly?: BaseTaskRequirements;
}

export interface BaseTaskRequirements {
    minCombatLevel?: number;
    questPoints?: number;
    quests?: QuestId[];
    skillLevels?: Partial<Record<SkillName, number>>;
}

export function areRequirementsFulfilled(
    context: RequestContext,
    requirements?: TaskRequirements
): boolean {
    if (!requirements) {
        return true;
    }

    const isIron = context.user.gameMode !== "main";

    if (isIron && requirements.ironOnly) {
        return (
            validateBaseRequirements(context, requirements) &&
            validateBaseRequirements(context, requirements.ironOnly)
        );
    } else {
        return validateBaseRequirements(context, requirements);
    }
}

function validateBaseRequirements(
    context: RequestContext,
    requirements: BaseTaskRequirements
): boolean {
    const {
        quests: requiredQuests,
        questPoints: requiredQuestPoints,
        skillLevels: requiredSkillLevels,
        minCombatLevel: requiredCombatLevel
    } = requirements;

    const user = context.user;

    if (
        requiredQuests &&
        requiredQuests.some(x => !user.completedQuests.has(x))
    ) {
        return false;
    }

    if (
        requiredQuestPoints &&
        requiredQuestPoints <= calculateAccumulatedQuestPoints(context)
    ) {
        return false;
    }

    if (requiredSkillLevels) {
        // Casting because TS doesn't infer the narrowed type from string
        const requiredSkills = Object.keys(requiredSkillLevels) as SkillName[];

        if (
            requiredSkills.some(
                x => requiredSkillLevels[x]! > user.stats.skills[x].level
            )
        ) {
            return false;
        }
    }

    if (
        requiredCombatLevel &&
        requiredCombatLevel > calculateCombatLevel(context.user.stats.skills)
    ) {
        return false;
    }

    return true;
}

function calculateAccumulatedQuestPoints(context: RequestContext): number {
    return Array.from(context.user.completedQuests).reduce(
        (rollup, curr) => rollup + context.data.quests[curr].questPoints,
        0
    );
}
