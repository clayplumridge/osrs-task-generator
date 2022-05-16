import { TaskLength } from "@/contracts/task";
import { RequestContext } from "@/generate/context";

export function generateTaskLength(context: RequestContext): TaskLength {
    return context.services.rng(0, 2);
}
