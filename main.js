import Game from './game.js';

const game = new Game();
document.querySelector('.control').style.display = 'none';
const start = () => {game.gameStart()}
setTimeout (start, 1000);