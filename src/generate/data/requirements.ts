import { SkillName } from "osrs-json-hiscores";
import { AllQuests, QuestId } from "./quests";
import { RequestContext } from "@/generate/context";

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
        skillLevels: requiredSkillLevels
    } = requirements;

    // Quest requirements
    if (
        requiredQuests &&
        requiredQuests.every(x => context.user.completedQuests.has(x))
    ) {
        return false;
    }

    // Quest point requirements
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
                x =>
                    requiredSkillLevels[x]! > context.user.stats.skills[x].level
            )
        ) {
            return false;
        }
    }

    return true;
}

function calculateAccumulatedQuestPoints(context: RequestContext): number {
    return Array.from(context.user.completedQuests).reduce(
        (rollup, curr) => rollup + AllQuests[curr].questPoints,
        0
    );
}
