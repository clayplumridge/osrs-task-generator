import { TaskGenerator } from "./index.types";
import { getLegalGenerators } from ".";
import { createTestRequestContext } from "@/testutil/context";
import { useTestState } from "@/testutil/state";

describe("getLegalGenerators", () => {
    const state = useTestState(() => {
        const fakeValidGenerator: TaskGenerator<any> = {
            canGenerate: jest.fn(() => true),
            generate: jest.fn()
        };

        const fakeInvalidGenerator: TaskGenerator<any> = {
            canGenerate: jest.fn(() => false),
            generate: jest.fn()
        };

        const context = createTestRequestContext(ctx => {
            ctx.services.generators.bosskc = fakeValidGenerator;
            ctx.services.generators.bossunique = fakeInvalidGenerator;
            return ctx;
        });

        return { context };
    });

    it("filters out illegal generators", () => {
        const legalGenerators = getLegalGenerators(state.context);
        expect(legalGenerators.length).toEqual(1);
    });
});
