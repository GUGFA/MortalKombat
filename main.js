const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $radioButton = document.getElementsByClassName('radiobutton');
const $chat = document.querySelector('.chat');
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
    const $img = createElement('img', 'spriteset');

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
    return document.querySelector('.player' + this.player + ' .life');
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


function enemyAttack() {
    const hit = ATTACK[randomizer(0, 2)];
    const defence = ATTACK[randomizer(0, 2)];
    return {
        value: randomizer(1, HIT[hit]),
        hit,
        defence
    }
}

function playerAttack() {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = randomizer(1, HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }

    return attack;
}

function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        for (i = 0; i < $radioButton.length; i++) {
            $radioButton[i].setAttribute("disabled", "disabled");
        }
        $randomButton.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
        console.log('победил Player2');
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
        console.log('победил Player1');
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWin());
        generateLogs('draw');
    }

}

function date() {
    const date = new Date();
    const currentTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return currentTime;
}

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();


    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1);
    }

    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2);

    }

    if (player.hit === enemy.defence) {
        generateLogs('defence', player1, player2);

    }

    else  if (enemy.hit === player.defence) {
        generateLogs('defence', player2, player1);


    }


    showResult();
});

function generateLogs(type, player1, player2) {
    let text = logs[type];
    let el = '';
    switch (type) {
        case 'start':
            text = text.replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', `${date()}`);
           break;

        case 'end':
            text = text[randomizer(0, logs[type].length-1)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            break;

        case 'draw':
            text;
            break;

        case 'hit':
            text = text[randomizer(0, text.length-1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            break;

        case 'defence':
            text = text[randomizer(0, text.length-1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            break;
    }
    if (type === 'hit' || type === 'defence') {
        console.log(attack);
        el = `<p>${date()} ${text} ${[player2.hp]}</p>`;
    }
    else {
        el = `<p>${text}</p>`;
    }
            $chat.insertAdjacentHTML('afterbegin', el);
}

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);
//console.log('####logs',logs.start.replace('[player1]', 'fffffff'));