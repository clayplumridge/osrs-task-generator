import { Skill, Skills } from "osrs-json-hiscores";
import { calculateCombatLevel } from "./osrs";

function makeSkill(level: number): Skill {
    return { level } as Skill;
}

const baseCombatStats = {
    attack: makeSkill(1),
    defence: makeSkill(1),
    hitpoints: makeSkill(10),
    magic: makeSkill(1),
    prayer: makeSkill(1),
    ranged: makeSkill(1),
    strength: makeSkill(1)
} as Skills;

function makeStats(mutator: (stats: Skills) => Skills): Skills {
    const copy = { ...baseCombatStats };
    return mutator(copy);
}

describe("calculateCombatLevel", () => {
    it("calculates new accounts correctly", () => {
        const result = calculateCombatLevel(baseCombatStats);
        expect(result).toEqual(3);
    });

    it("calculates maxed-melee correctly", () => {
        const stats = makeStats(stats => {
            stats.attack = makeSkill(99);
            stats.strength = makeSkill(99);
            stats.defence = makeSkill(99);
            stats.hitpoints = makeSkill(99);
            stats.prayer = makeSkill(99);

            return stats;
        });

        const result = calculateCombatLevel(stats);
        expect(result).toEqual(126);
    });

    it("calculates maxed-mage correctly", () => {
        const stats = makeStats(stats => {
            stats.magic = makeSkill(99);
            stats.defence = makeSkill(99);
            stats.hitpoints = makeSkill(99);
            stats.prayer = makeSkill(99);

            return stats;
        });

        const result = calculateCombatLevel(stats);
        expect(result).toEqual(109);
    });

    it("calculates maxed-range correctly", () => {
        const stats = makeStats(stats => {
            stats.ranged = makeSkill(99);
            stats.defence = makeSkill(99);
            stats.hitpoints = makeSkill(99);
            stats.prayer = makeSkill(99);

            return stats;
        });

        const result = calculateCombatLevel(stats);
        expect(result).toEqual(109);
    });
});
