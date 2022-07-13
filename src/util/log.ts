import { inspect } from "util";

export const enum TraceLevel {
    Debug = "debug",
    Error = "error",
    Info = "info",
    Timing = "timing",
    Warn = "warn"
}

export interface Trace {
    action: string;
    area: string;
    level: TraceLevel;
    nodeClusterId: string;
    payload: any;
    timestamp: number;
}

export interface TimingPayload {
    [extraProps: string]: any;
    duration: number;
    end: number;
    start: number;
}

export interface Logger {
    debug: (payload: any, action?: string) => void;
    error: (payload: any, action?: string) => void;
    info: (payload: any, action?: string) => void;
    timing: (payload: TimingPayload, action?: string) => void;
    warn: (payload: any, action?: string) => void;
}

const memoizedLoggers: Record<string, Logger> = {};
export function getLogger(area: string): Logger {
    if (!memoizedLoggers[area]) {
        memoizedLoggers[area] = new LoggerImpl(area);
    }
    return memoizedLoggers[area];
}

const consoleLogMap: Record<TraceLevel, (message: string) => void> = {
    debug: console.log,
    error: console.error,
    info: console.log,
    timing: console.log,
    warn: console.warn
};

class LoggerImpl implements Logger {
    constructor(private readonly area: string) {}

    public debug = (payload: any, action?: string) =>
        this.trace(TraceLevel.Debug, action, payload);
    public info = (payload: any, action?: string) =>
        this.trace(TraceLevel.Info, action, payload);
    public timing = (payload: TimingPayload, action?: string) =>
        this.trace(TraceLevel.Timing, action, payload);
    public warn = (payload: any, action?: string) =>
        this.trace(TraceLevel.Warn, action, payload);
    public error = (payload: any, action?: string) =>
        this.trace(TraceLevel.Error, action, payload);

    private trace(level: TraceLevel, action: string | undefined, payload: any) {
        const timestamp = Date.now();

        action = action || "Log";

        // Using inspect instead of JSON.stringify because inspect doesn't throw on circular references, just handles them
        consoleLogMap[level](
            `[${new Date(timestamp).toLocaleString()}][${level}][${
                this.area
            }][${action}] ${inspect(payload)}`
        );
    }
}
