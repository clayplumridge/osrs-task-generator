import { Constraints } from "@/contracts/task";

export function satisfiesWildernessConstraint(
    constraint: Constraints["wilderness"],
    taskDetails: { isWilderness: boolean }
) {
    switch (constraint) {
        case undefined:
        case "allow":
            return true;
        case "require":
            return taskDetails.isWilderness;
        case "disallow":
            return !taskDetails.isWilderness;
    }
}
