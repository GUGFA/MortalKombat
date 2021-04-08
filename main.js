const $arenas = document.querySelector('.arenas');

const Player1 = {
    name: 'Scorpion',
    hp: 100,
    img: 'assets/characters/scorpion.gif',
    weapon: ['Shotgun', 'Chainsaw'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...');
    }
};

const Player2 = {
    name: 'Kitana',
    hp: 100,
    img: 'assets/characters/kitana.gif',
    weapon: ['Fan', 'Spoon'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...');
    }
};


function createPlayer(PlayerClass, Player) {
    $player = document.createElement('div');
    $progressBar = document.createElement('div');
    $character = document.createElement('div');
    $img = document.createElement('img');
    $life = document.createElement('div');
    $name = document.createElement('div');
    $player.classList.add(PlayerClass);
    $progressBar.classList.add('progressbar');
    $character.classList.add('character');
    $img.src = Player.img;
    $life.classList.add('life');
    $life.style.width = (Player.hp +'%');
    $name.classList.add('name');
    $name.innerText = Player.name;
    $arenas.appendChild($player);
    $player.appendChild($progressBar);
    $player.appendChild($character);
    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    $character.appendChild($img);
}

createPlayer('player1', Player1);
createPlayer('player2', Player2);