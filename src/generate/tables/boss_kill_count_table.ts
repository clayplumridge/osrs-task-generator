import { random } from "lodash";
import { generateTaskLength } from "./util";
import { BossKillCountTask, Constraints, TaskType } from "@/contracts/task";
import { RequestContext } from "@/generate/context";
import { BossId } from "@/generate/data/bosses";
import { areRequirementsFulfilled } from "@/generate/data/requirements";
import { RngTableBuilder } from "@/rng/rng_table";

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

    const validBosses = Object.values(context.data.bosses).filter(bossDetails =>
        areRequirementsFulfilled(context, bossDetails.requirements)
    );

    validBosses.forEach(boss => {
        const taskLength = generateTaskLength();
        const [taskMinKills, taskMaxKills] = boss.killCountRanges[taskLength];
        const taskKillCount = random(taskMinKills, taskMaxKills);

        tableBuilder.withItem(BossWeights[boss.id], {
            boss,
            kills: taskKillCount,
            type: TaskType.BossKillCount
        });
    });

    return tableBuilder.build({ name: "Boss Kill Count" });
}
