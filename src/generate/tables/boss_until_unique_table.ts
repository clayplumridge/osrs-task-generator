import { isTaskTypeAllowed } from "./util";
import { BossUntilUniqueTask, Constraints, TaskType } from "@/contracts/task";
import { RequestContext } from "@/generate/context";
import { BossId } from "@/generate/data/bosses";
import { satisfiesWildernessConstraint } from "@/generate/data/constraints";
import { areRequirementsFulfilled } from "@/generate/data/requirements";
import { RngTableBuilder } from "@/generate/rng/rng_table";

type BossWeightRecord = { [key in BossId]: number };

const BossWeights: BossWeightRecord = {
    [BossId.ChaosFanatic]: 1,
    [BossId.GiantMole]: 2,
    [BossId.Kril]: 2,
    [BossId.Tempoross]: 1,
    [BossId.Wintertodt]: 1
};

export function makeTable(context: RequestContext, constraints?: Constraints) {
    let tableBuilder = RngTableBuilder.create<BossUntilUniqueTask>();

    if (!isTaskTypeAllowed(TaskType.BossUntilUnique, constraints)) {
        return tableBuilder.build();
    }

    const validBosses = Object.values(context.data.bosses).filter(
        bossDetails =>
            areRequirementsFulfilled(context, bossDetails.requirements) &&
            satisfiesWildernessConstraint(constraints?.wilderness, bossDetails)
    );

    validBosses.forEach(boss => {
        tableBuilder = tableBuilder.withItem(BossWeights[boss.id], {
            boss,
            type: TaskType.BossUntilUnique
        });
    });

    return tableBuilder.build({ name: "Boss Kill Count" });
}
