import { CompleteQuestTask, Constraints, TaskType } from "@/contracts/task";
import { RequestContext } from "@/generate/context";
import { QuestId } from "@/generate/data/quests";
import { areRequirementsFulfilled } from "@/generate/data/requirements";
import { RngTableBuilder } from "@/rng/rng_table";

type QuestWeightRecord = { [key in QuestId]: number };

const QuestWeights: QuestWeightRecord = {
    [QuestId.CooksAssistant]: 2,
    [QuestId.DeathPlateau]: 1,
    [QuestId.DemonSlayer]: 1,
    [QuestId.DragonSlayer1]: 2,
    [QuestId.DruidicRitual]: 1,
    [QuestId.RestlessGhost]: 2,
    [QuestId.RuneMysteries]: 2,
    [QuestId.TrollStronghold]: 2
};

export function makeTable(context: RequestContext, constraints?: Constraints) {
    let tableBuilder = RngTableBuilder.create<CompleteQuestTask>();

    const validQuests = Object.values(context.data.quests).filter(
        questDetails =>
            areRequirementsFulfilled(context, questDetails.requirements)
    );

    validQuests.forEach(quest => {
        tableBuilder = tableBuilder.withItem(QuestWeights[quest.id], {
            quest,
            type: TaskType.CompleteQuest
        });
    });

    return tableBuilder.build({ name: "CompleteQuest" });
}