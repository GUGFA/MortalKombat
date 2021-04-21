import {createPlayer} from './creators.js';
import {player1, player2} from './characters.js';
import {playerAttack, enemyAttack} from './attacks.js';
import {generateLogs}from './battleLogs.js';
import {showResult} from './results.js';

export const $arenas = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');
export const $chat = document.querySelector('.chat');
export const HIT = {
    head: 30,
    body: 25,
    foot: 20};
export const ATTACK = ['head', 'body', 'foot'];
export const $femaleCharacters = ['Sonya', 'Kitana', 'Jade', 'Mileena', 'Khameleon', 'Sheeva', 'Sindel'];

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();


    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    }
    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value);

    }
    if (player.hit === enemy.defence) {
        generateLogs('defence', player1, player2);

    }
    if (enemy.hit === player.defence) {
        generateLogs('defence', player2, player1);


    }
    showResult();
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);