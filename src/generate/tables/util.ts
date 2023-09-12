import { random } from "lodash";
import { TaskLength } from "@/contracts/task";

export function generateTaskLength(): TaskLength {
    return random(0, 2);
}
