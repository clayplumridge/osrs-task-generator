import { generate } from "./generate";
import { createRequestContext } from "./generate/context";
import { getLogger } from "./generate/util/log";

const mainLogger = getLogger("main");

createRequestContext("Dorgenedge")
    .then(ctx => generate(ctx, {}))
    .then(task => mainLogger.info(task));
