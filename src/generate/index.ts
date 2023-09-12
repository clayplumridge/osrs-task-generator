import { RequestContext } from "./context";
import {
    makeBossKillCountTable,
    makeBossUntilUniqueTable,
    makeQuestTable
} from "./tables";
import { Constraints } from "@/contracts/task";
import { RngTableBuilder } from "@/rng/rng_table";
import { withTimings } from "@/util/timing";

export const generate = withTimings(
    (requestContext: RequestContext, constraints?: Constraints) => {
        const table = makeTable(requestContext, constraints);
        return table.roll();
    },
    "generate"
);

export function makeTable(context: RequestContext, constraints?: Constraints) {
    return RngTableBuilder.create()
        .withSubtable(1, makeQuestTable(context, constraints))
        .withSubtable(1, makeBossKillCountTable(context, constraints))
        .withSubtable(1, makeBossUntilUniqueTable(context, constraints))
        .build({ name: "All Tasks" });
}
