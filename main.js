const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'assets/characters/scorpion.gif',
    weapon: ['Shotgun', 'Chainsaw'],
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
    playerHit: playerHit,

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
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
    playerHit: playerHit
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

function playerHit() {
    let z = document.querySelector('.character' + ' .img');
    return z;
    
    
}

function myFunc () {
    let $ermac = document.querySelector('img');
   $ermac.src = 'assets/characters/ermac-roundhouse.gif';
  }

  function Scorp () {
        setTimeout(function(){ 
         let $scorp = document.querySelector('img');
         $scorp.src = 'assets/characters/scorpion.gif'; 
        }, 1000);
    
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
    $arenas.appendChild($restartDiv);
    $restartDiv.appendChild($restartBtn);

}

function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$randomButton.addEventListener('click', function () {
    player1.changeHP(randomizer(1, 20));
    player1.renderHP();
    player1.playerHit();
    myFunc();
    Scorp();    // setTimeout(function(){
    //     let $scorp = document.querySelector('img');
    //    $scorp.src = 'assets/characters/scorpion.gif';
    //   }, 1000);
      // setTimeout(Scorp(), 1000); - хз почему не работает так?


    player2.changeHP(randomizer(1, 20));
    player2.renderHP();
    player2.playerHit();

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        $arenas.appendChild(createReloadButton());
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWin());
    }
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));