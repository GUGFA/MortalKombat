const $arenas = document.querySelector('.arenas');

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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));