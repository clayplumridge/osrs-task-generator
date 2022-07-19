import { RngTableBuilder } from "@/rng/rng_table";
import { useRandomResults } from "@/testutil/rng";
import { useTestState } from "@/testutil/state";

describe("rng_table", () => {
    describe("non-recursive tables", () => {
        const state = useTestState(() => {
            useRandomResults([5, 15, 25]);

            const table = new RngTableBuilder()
                .addItem(10, "first")
                .addItem(10, "second")
                .addItem(10, "third")
                .build();

            return { table };
        });

        it("uses weights of items correctly", () => {
            expect(state.table.roll()).toEqual("first");
            expect(state.table.roll()).toEqual("second");
            expect(state.table.roll()).toEqual("third");
        });
    });

    describe("recursive tables", () => {
        const state = useTestState(() => {
            const table = new RngTableBuilder()
                .addItem(10, "first")
                .addSubtable(
                    10,
                    new RngTableBuilder()
                        .addItem(10, { subtable: true })
                        .build()
                )
                .build();

            return { table };
        });

        it("returns results from recursive tables when it hits them", () => {
            useRandomResults([15, 5]);
            expect(state.table.roll()).toEqual({ subtable: true });
        });
    });
});
