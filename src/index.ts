import { generate } from "./generate";
import { createRequestContext } from "./generate/context";

createRequestContext("Dorgenedge")
    .then(ctx => generate(ctx, {}))
    .then(task => console.log(task));
