import { random } from "lodash";
import { generateTaskLength, isTaskTypeAllowed } from "./util";
import { BossKillCountTask, Constraints, TaskType } from "@/contracts/task";
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
    let tableBuilder = RngTableBuilder.create<BossKillCountTask>();

    if (!isTaskTypeAllowed(TaskType.BossKillCount, constraints)) {
        return tableBuilder.build();
    }

    const validBosses = Object.values(context.data.bosses).filter(
        bossDetails =>
            areRequirementsFulfilled(context, bossDetails.requirements) &&
            satisfiesWildernessConstraint(constraints?.wilderness, bossDetails)
    );

    validBosses.forEach(boss => {
        const taskLength = generateTaskLength(constraints);

        const [taskMinKills, taskMaxKills] = boss.killCountRanges[taskLength];
        const taskKillCount = random(taskMinKills, taskMaxKills);

        tableBuilder = tableBuilder.withItem(BossWeights[boss.id], {
            boss,
            kills: taskKillCount,
            type: TaskType.BossKillCount
        });
    });

    return tableBuilder.build({ name: "Boss Kill Count" });
}
