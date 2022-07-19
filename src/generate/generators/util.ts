import { random } from "lodash";
import { TaskLength } from "@/contracts/task";
import { RequestContext } from "@/generate/context";

export function generateTaskLength(context: RequestContext): TaskLength {
    return random(0, 2);
}
