import { RequestContext } from "./context";
import { makeBossKillCountTable, makeQuestTable } from "./tables";
import { Constraints } from "@/contracts/task";
import { RngTableBuilder } from "@/rng/rng_table";
import { withTimings } from "@/util/timing";

export const generate = withTimings(
    (requestContext: RequestContext, constraints?: Constraints) => {
        return makeTable(requestContext, constraints).roll();
    },
    "generate"
);

export function makeTable(context: RequestContext, constraints?: Constraints) {
    return RngTableBuilder.create()
        .withSubtable(1, makeQuestTable(context, constraints))
        .withSubtable(1, makeBossKillCountTable(context, constraints))
        .build({ name: "Full Table" });
}
