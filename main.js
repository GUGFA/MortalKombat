const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $radioButton = document.getElementsByClassName("radiobutton");
const attack = {};
const HIT = {
    head: 30,
    body: 25,
    foot: 20
};

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'assets/characters/scorpion.gif',
    weapon: ['Shotgun', 'Chainsaw'],
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
    },
    changeHP,
    elHP,
    renderHP
};

const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'assets/characters/kitana.gif',
    weapon: ['Fan', 'Spoon'],
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
    },
    changeHP,
    elHP,
    renderHP
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(playerObj) {
    const $player = createElement('div', 'player' + playerObj.player);
    const $progressBar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = (playerObj.hp + '%');
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
        this.hp = 0;
    } else {
        this.hp -= damage;
    }
}

function elHP() {
    return document.querySelector('.player'+ this.player + ' .life');
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');

    if (name) {
        $winTitle.innerText = name + ' WINS';
    } else {
        $winTitle.innerText = 'DRAW';
    }

    return $winTitle;
}

function createReloadButton() {
    const $restartBtn = createElement('button', 'button');
    $restartBtn.innerText = 'Restart';
    $restartBtn.addEventListener('click', function () {
        window.location.reload();
    });

    const $restartDiv = createElement('div', 'reloadWrap');
    $restartDiv.appendChild($restartBtn);
    $arenas.appendChild($restartDiv);

    return $restartDiv;
}

function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[randomizer(0,2)];
    const defence = ATTACK[randomizer(0,2)];
    return {
        value: randomizer(1,HIT[hit]),
        hit,
        defence
    }
}

$formFight.addEventListener('submit', function(e) {
        e.preventDefault();
        const enemy = enemyAttack();

        for (let item of $formFight) {
            if (item.checked && item.name === 'hit') {
                console.log(item.value);
                attack.value = randomizer(1,HIT[item.value]);
                attack.hit = item.value;
            }
            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }
            item.checked = false;
        }

        console.log('#### player:', attack);
        console.log('#### enemy:', enemy);

        if (attack.hit === enemy.defence) {
            console.log('enemy bloked your hit');
            attack.value = 0;
        }
        
        if (enemy.hit === attack.defence) {
            console.log('you bloked enemy hit');
            enemy.value = 0;
        }

        player1.changeHP(enemy.value);
        console.log('Player1 HP:',player1.hp);
        player1.renderHP();

        player2.changeHP(attack.value);
        console.log('Player2 HP:',player2.hp);
        player2.renderHP();

        if (player1.hp === 0 || player2.hp === 0) {              
                 for (i = 0; i < $radioButton.length; i++) {
                    $radioButton[i].setAttribute("disabled", "disabled"); 
                    }
                $randomButton.disabled = true;
                createReloadButton();
                }
            
                if (player1.hp === 0 && player1.hp < player2.hp) {
                    $arenas.appendChild(playerWin(player2.name));
                } else if (player2.hp === 0 && player2.hp < player1.hp) {
                    $arenas.appendChild(playerWin(player1.name));
                } else if (player1.hp === 0 && player2.hp === 0) {
                    $arenas.appendChild(playerWin());
                }
    }
);