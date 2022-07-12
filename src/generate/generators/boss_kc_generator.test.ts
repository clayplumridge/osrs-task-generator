import { bossKillCountGenerator } from "./boss_kc_generator";
import { TaskType } from "@/contracts/task";
import { AllBosses, BossId } from "@/generate/data/bosses";
import { createTestRequestContext } from "@/testutil/context";
import { useTestState } from "@/testutil/state";

describe("bossKillCountGenerator", () => {
    const state = useTestState(() => {
        const rngMock = jest.fn(min => Math.max(min || 0, 1));

        const context = createTestRequestContext(ctx => {
            ctx.data.bosses[BossId.Wintertodt] = {
                ...AllBosses[BossId.Wintertodt],
                requirements: {}
            };

            ctx.data.bosses[BossId.Tempoross] = {
                ...AllBosses[BossId.Tempoross],
                requirements: {}
            };

            ctx.services.rng = rngMock;

            return ctx;
        });

        return { context };
    });

    describe("canGenerate", () => {
        it("rejects invalid TaskType constraints", () => {
            const result = bossKillCountGenerator.canGenerate(state.context, {
                allowedTypes: [TaskType.TrainSkill]
            });
            expect(result).toEqual(false);
        });

        it("accepts valid TaskType constraints", () => {
            const result = bossKillCountGenerator.canGenerate(state.context, {
                allowedTypes: [TaskType.BossKillCount]
            });

            expect(result).toEqual(true);
        });
    });

    describe("generate", () => {
        it("produces valid tasks", () => {
            expect(
                bossKillCountGenerator.generate(state.context)
            ).toBeDefined();
        });
    });
});
