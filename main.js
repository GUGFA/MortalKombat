const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'assets/characters/scorpion.gif',
    weapon: ['Shotgun', 'Chainsaw'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...');
    }
};

const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'assets/characters/kitana.gif',
    weapon: ['Fan', 'Spoon'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...');
    }
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) { 
        $tag.classList.add(className); 
    }

    return $tag;
}

function createPlayer(playerObj) {
    const $player = createElement('div', 'player'+playerObj.player);
    const $progressBar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = (playerObj.hp +'%');
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;
    
    $player.appendChild($progressBar);
    $player.appendChild($character);
    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    $character.appendChild($img);

    return $player;
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player'+ player.player + ' .life');
    player.hp -= randomiser(1,20);
    $playerLife.style.width = player.hp + '%';


        
      
        if (player.hp <= 0 && player1.hp <= 0 && player2.hp <= 0) {
            player.hp = 0;
            $playerLife.style.width = player.hp + '%';
            $arenas.appendChild(draw());
            $randomButton.disabled = true;
            return;
        }
        else if (player.hp < 0 ) {
            player.hp = 0;
            winner = player.name === player2.name ? player1.name : player2.name;
            $playerLife.style.width = player.hp + '%';
            $arenas.appendChild(playerWin(winner));
            $randomButton.disabled = true;
            return;
        }
    }

    

function playerWin(name) {
    $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' WINS';
    
    return $winTitle;
}

function draw() {
    $drawTitle = createElement('div', 'loseTitle');
    $drawTitle.innerText = 'DRAW !';
    
    return $drawTitle;
}

function randomiser(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

$randomButton.addEventListener('click', function() {
    changeHP(player1);
    changeHP(player2);
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));