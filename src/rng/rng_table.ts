import { inspect } from "util";
import _, { random } from "lodash";

const enum RngTableItemType {
    Subtable = 0,
    ConcreteItem = 1
}

interface SubtableItem<T> {
    _type: RngTableItemType.Subtable;
    subtable: RngTable<T>;
    weight: number;
}

interface ConcreteItem<T> {
    _type: RngTableItemType.ConcreteItem;
    item: T;
    weight: number;
}

type Item<T> = SubtableItem<T> | ConcreteItem<T>;

export interface RngTableBuilderOptions {
    name?: string;
}

export class RngTableBuilder<T = never> {
    private readonly items: Array<Item<T>> = [];

    public addSubtable<SubtableType>(
        weight: number,
        subtable: RngTable<SubtableType>
    ): RngTableBuilder<T | SubtableType> {
        const typecastItems = this.items as Array<Item<T | SubtableType>>;

        typecastItems.push({
            _type: RngTableItemType.Subtable,
            subtable,
            weight
        });

        return this;
    }

    public addItem<ItemType>(
        weight: number,
        item: ItemType
    ): RngTableBuilder<T | ItemType> {
        const typecastItems = this.items as Array<Item<T | ItemType>>;

        typecastItems.push({
            _type: RngTableItemType.ConcreteItem,
            item,
            weight
        });

        return this;
    }

    public build(options?: RngTableBuilderOptions) {
        return new RngTable<T>(this.items, options);
    }
}

class RngTable<T> {
    private readonly table: Array<Item<T>>;
    private readonly totalWeight: number;

    constructor(
        private readonly itemsRaw: Array<Item<T>>,
        private readonly options?: RngTableBuilderOptions
    ) {
        this.totalWeight = itemsRaw
            .map(x => x.weight)
            .reduce((prev, curr) => prev + curr, 0);

        this.table = [];
        itemsRaw.forEach(x => {
            _.times(x.weight, () => {
                this.table.push(x);
            });
        });
    }

    public roll(): T {
        const pos = random(0, this.totalWeight);
        const selected = this.table[pos];

        switch (selected._type) {
            case RngTableItemType.ConcreteItem:
                return selected.item;
            case RngTableItemType.Subtable:
                return selected.subtable.roll();
        }
    }

    public print(): string {
        return this.printInternal(0, 1);
    }

    protected printInternal(
        currentDepth: number,
        oddsOfHittingThisTable: number
    ): string {
        let result = "";
        const prefix = getPrintPrefix(currentDepth, "|");

        this.itemsRaw.forEach(item => {
            switch (item._type) {
                case RngTableItemType.ConcreteItem:
                    result =
                        result +
                        `${prefix} ${this.printConcreteItem(
                            item,
                            oddsOfHittingThisTable
                        )}\n`;
                    break;

                case RngTableItemType.Subtable:
                    result =
                        result +
                        `${prefix}- ${this.printSubTableHeader(
                            item,
                            oddsOfHittingThisTable
                        )}\n` +
                        item.subtable.printInternal(
                            currentDepth + 1,
                            (oddsOfHittingThisTable * item.weight) /
                                this.totalWeight
                        );
                    break;
            }
        });

        return result;
    }

    private printConcreteItem(
        item: ConcreteItem<T>,
        oddsOfHittingThisTable: number
    ): string {
        const printableOdds = getPrintableOdds(
            oddsOfHittingThisTable,
            item.weight,
            this.totalWeight
        );
        const maybeName: string | undefined = (item.item as any).name;

        return `Weight: ${item.weight} (${printableOdds}%) - ${
            maybeName ?? inspect(item.item)
        }`;
    }

    private printSubTableHeader(
        item: SubtableItem<T>,
        oddsOfHittingThisTable: number
    ): string {
        const name = item.subtable.options?.name ?? "Unnamed";
        const printableOdds = getPrintableOdds(
            oddsOfHittingThisTable,
            item.weight,
            this.totalWeight
        );

        return `Subtable (${name}) - Weight: ${item.weight} (${printableOdds})`;
    }
}

function getPrintPrefix(depth: number, repeat: string) {
    let prefix = "";

    _.times(depth, () => {
        prefix = `${prefix}${repeat}`;
    });

    return prefix;
}

function getPrintableOdds(
    oddsOfHittingThisTable: number,
    itemWeight: number,
    totalWeight: number
): number {
    const percentOdds = (oddsOfHittingThisTable * itemWeight) / totalWeight;
    return _.round(percentOdds * 100, 4); // XX.XX = 4
}
