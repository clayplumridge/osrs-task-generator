import { getLogger } from "./log";

const timingLogger = getLogger("withTimings");

export function withTimings<T extends (...args: any[]) => any>(
    baseFunc: T,
    funcName: string
): (...funcArgs: Parameters<T>) => ReturnType<T> {
    return (...args: Parameters<T>) => {
        const start = Date.now();
        const result = baseFunc(...args);
        const end = Date.now();

        const duration = end - start;
        timingLogger.timing({ duration, end, start }, funcName);

        return result;
    };
}
