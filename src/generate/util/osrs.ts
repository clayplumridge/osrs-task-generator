import { Skills } from "osrs-json-hiscores";

export function calculateCombatLevel(skills: Skills): number {
    const { attack, strength, defence, hitpoints, prayer, ranged, magic } =
        skills;

    const base =
        0.25 *
        (defence.level + hitpoints.level + Math.floor(0.5 * prayer.level));
    const melee = (13 / 40) * (attack.level + strength.level);
    const range = (13 / 40) * Math.floor(ranged.level * 1.5);
    const mage = (13 / 40) * Math.floor(magic.level * 1.5);

    return Math.floor(base + Math.max(melee, range, mage));
}
