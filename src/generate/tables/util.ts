import { random } from "lodash";
import { Constraints, TaskLength } from "@/contracts/task";

export function generateTaskLength(constraints?: Constraints): TaskLength {
    return random(0, constraints?.requiredMaxLength ?? TaskLength.Long);
}
