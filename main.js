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
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
};

const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'assets/characters/kitana.gif',
    weapon: ['Fan', 'Spoon'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) { 
        $tag.classList.add(className); 
    }

    return $tag;
}

function createReloadButton() {
    const $restartBtn = createElement('button', 'button');
    $restartBtn.innerText = 'Restart';
    $restartBtn.addEventListener('click', function () {
        window.location.reload();
    });

    const $restartDiv = createElement('div', 'reloadWrap');
    $restartDiv.appendChild($restartBtn);

    return $restartDiv;
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

function changeHP(damage) {
    if (this.hp < damage) {
        this.player.hp = 0;
    } else {
        this.hp -= damage;
    }
}

function elHP() {
    const $playerLife = document.querySelector('.player'+ this.player + ' .life');
    return $playerLife;
    
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) {
    $winTitle.innerText = name + ' WINS';
    }
    else {
        $winTitle.innerText = 'DRAW';
    }
    
    return $winTitle;
}

function randomiser(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


$randomButton.addEventListener('click', function() {
    player1.changeHP(randomiser(1,20));
    player1.elHP();
    player1.renderHP(player1.elHP);
    player2.changeHP(randomiser(1,20));
    player2.elHP();
    player2.renderHP(player2.elHP);

    if (player1.hp === 0 || player2.hp === 0){
        $randomButton.disabled = true;
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
    }
    else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
    }
    else if (player1.hp === 0 && player2.hp === 0 ) {
        $arenas.appendChild(playerWin());
    }
});

createReloadButton();

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));