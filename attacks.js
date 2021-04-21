import {ATTACK,HIT,$formFight} from './main.js';
import {randomizer} from './utils.js';

export let enemyAttack = () => {
    const hit = ATTACK[randomizer(0, 2)];
    const defence = ATTACK[randomizer(0, 2)];
    return {
        value: randomizer(1, HIT[hit]),
        hit,
        defence
    }
}

export function playerAttack() {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = randomizer(1, HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }

    return attack;
}