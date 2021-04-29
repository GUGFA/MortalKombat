// import {createElement, createPlayer, showBanner} from './creators.js';
// import {player1, player2} from './playerclass.js';
// import {$arenas, $formFight, $gameStart} from './main.js';
// import {generateLogs}from './battleLogs.js';
// import {playSound} from './utils.js';

// const $radioButton = document.getElementsByClassName('radiobutton');
// const $randomButton = document.querySelector('.button');


// export function gameStart() {
//     $gameStart.addEventListener('click', function () {
//     setTimeout(() => $formFight.style.display = 'flex', 1500);
//     $arenas.removeChild($gameStart);
//     setTimeout(() => document.getElementById("mortalkombat").play(), 1500);
//     setTimeout(playSound.bind(null, 'Fight'), 500);
//     setTimeout(showBanner, 600);
    
//     $arenas.appendChild(createPlayer(player1));
//     $arenas.appendChild(createPlayer(player2));
//     generateLogs('start', player1, player2);
// });
// }

// let createReloadButton = () => {
//     const $restartBtn = createElement('button', 'button');
//     const $restartDiv = createElement('div', 'reloadWrap');
//     document.getElementById("mortalkombat").pause();
//     $restartBtn.innerText = 'Restart';
//     $restartBtn.addEventListener('click', function () {
//         window.location.reload();
//     });
//     $formFight.style.display = 'none';
//     $restartDiv.appendChild($restartBtn);
//     $arenas.appendChild($restartDiv);

//     return $restartDiv;
// }

// export let playerWin = (name) => {
//     const $winTitle = createElement('div', 'loseTitle');
//     (name) ? $winTitle.innerText = name + ' WINS' : $winTitle.innerText = 'DRAW';
//     console.log($winTitle.innerText);
//     //console.log(name);
//     setTimeout(playSound.bind(null, `${$winTitle.innerText}`), 100);
//     return $winTitle;
// };

// export function showResult() {
//     if (player1.hp === 0 || player2.hp === 0) {
//         for (let i = 0; i < $radioButton.length; i++) {
//             $radioButton[i].setAttribute("disabled", "disabled");
//         }
//         $randomButton.disabled = true;
//         createReloadButton();
//     }
//     if (player1.hp === 0 && player1.hp < player2.hp) {
//         $arenas.appendChild(playerWin(player2.name));
//         generateLogs('end', player2, player1);
//     } else if (player2.hp === 0 && player2.hp < player1.hp) {
//         $arenas.appendChild(playerWin(player1.name));
//         generateLogs('end', player1, player2);
//     } else if (player1.hp === 0 && player2.hp === 0) {
//         $arenas.appendChild(playerWin());
//         generateLogs('draw');
//     }

// }