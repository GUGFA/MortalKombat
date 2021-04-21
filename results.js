import {createElement} from './creators.js';
import {player1, player2} from './characters.js';
import {$arenas} from './main.js';
import {generateLogs}from './battleLogs.js';

const $radioButton = document.getElementsByClassName('radiobutton');
const $randomButton = document.querySelector('.button');


let createReloadButton = () => {
    const $restartBtn = createElement('button', 'button');
    const $restartDiv = createElement('div', 'reloadWrap');
    $restartBtn.innerText = 'Restart';
    $restartBtn.addEventListener('click', function () {
        window.location.reload();
    });
    $restartDiv.appendChild($restartBtn);
    $arenas.appendChild($restartDiv);

    return $restartDiv;
}

export let playerWin = (name) => {
    const $winTitle = createElement('div', 'loseTitle');
    (name) ? $winTitle.innerText = name + ' WINS' : $winTitle.innerText = 'DRAW';
    return $winTitle;
};

export function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        for (let i = 0; i < $radioButton.length; i++) {
            $radioButton[i].setAttribute("disabled", "disabled");
        }
        $randomButton.disabled = true;
        createReloadButton();
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWin());
        generateLogs('draw');
    }

}