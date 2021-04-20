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
const femaleCharacters = ['Sonya', 'Kitana', 'Jade', 'Mileena', 'Khameleon', 'Sheeva', 'Sindel'];

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
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
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
        generateLogs('hit', player2, player1, enemy.value);
    }

    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value);

    }

    if (player.hit === enemy.defence) {
        generateLogs('defence', player1, player2);

    }

    if (enemy.hit === player.defence) {
        generateLogs('defence', player2, player1);


    }


    showResult();
});

function generateLogs(type, player1, player2, damage = 0) {
    let text = logs[type];
    let el = '';
    console.log(text);
    switch (type) {
        case 'start':
            text = text.replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', `${date()}`).replace(' ', ' ').replace(' ', ' ');
           break;

        case 'end':
            text = text[randomizer(0, logs[type].length-1)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            break;

        case 'hit':
            text = text[randomizer(0, text.length-1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            break;

        case 'defence':
            text = text[randomizer(0, text.length-1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            break;
    }
    if (type === 'hit' || type === 'defence') {
        const color = damage === 0 ? 'green':'red';
        const figa = 'фигу с маслом';
        el = `<p>${date()} ${text} <span style="color:${color}"> -${damage} </span>  ${[player2.hp]}/100</p>`;
    }
    else {
        el = `<p>${text}</p>`;
    }
            $chat.insertAdjacentHTML('afterbegin', el);
}

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        `Результат удара [playerWins]: [playerLose] - труп`,
        `[playerLose] ${genderCheck(player2, 'погиб')} от удара бойца [playerWins]`,
        `Результат боя: [playerLose] - жертва, [playerWins] - убийца`,
    ],
    hit: [
        `[playerDefence] ${genderCheck(player1, 'пытался')} сконцентрироваться, но [playerKick] разбежавшись ${genderCheck(player2, 'раздробил')} копчиком левое ухо врага.`,
        `[playerDefence] ${genderCheck(player1, 'расстроился')}, как вдруг, неожиданно [playerKick] случайно ${genderCheck(player2, 'раздробил')} грудью грудину противника.`,
        `[playerDefence] ${genderCheck(player1, 'зажмурился')}, а в это время [playerKick], прослезившись, ${genderCheck(player2, 'раздробил')} кулаком пах оппонента.`,
        `[playerDefence] ${genderCheck(player1, 'чесал')} <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно ${genderCheck(player2, 'размозжил')} грудью левый бицепс оппонента.`,
        `[playerDefence] ${genderCheck(player1, 'ковырялся')} в зубах, но [playerKick] проснувшись ${genderCheck(player2, 'влепил')} тяжелый удар пальцем в кадык врага.`,
        `[playerDefence] ${genderCheck(player1, 'вспомнил')} что-то важное, но внезапно [playerKick] зевнув, ${genderCheck(player2, 'размозжил')} открытой ладонью челюсть противника.`,
        `[playerDefence] ${genderCheck(player1, 'осмотрелся')}, и в это время [playerKick] мимоходом ${genderCheck(player2, 'раздробил')} стопой аппендикс соперника.`,
        `[playerDefence] ${genderCheck(player1, 'кашлянул')}, но внезапно [playerKick] показав палец, ${genderCheck(player2, 'размозжил')} пальцем грудь соперника.`,
        `[playerDefence] ${genderCheck(player1, 'пытался')} что-то сказать, а жестокий [playerKick] проснувшись ${genderCheck(player2, 'размозжил')} копчиком левую ногу противника.`,
        `[playerDefence] ${genderCheck(player1, 'забылся')}, как внезапно безумный [playerKick] со скуки, ${genderCheck(player2, 'влепил')} удар коленом в левый бок соперника.`,
        `[playerDefence] ${genderCheck(player1, 'поперхнулся')}, а за это [playerKick] мимоходом ${genderCheck(player2, 'раздробил')} коленом висок врага.`,
        `[playerDefence] ${genderCheck(player1, 'расстроился')}, а в это время наглый [playerKick] пошатнувшись ${genderCheck(player2, 'размозжил')} копчиком губы оппонента.`,
        `[playerDefence] ${genderCheck(player1, 'осмотрелся')}, но внезапно [playerKick] робко ${genderCheck(player2, 'размозжил')} коленом левый глаз противника.`,
        `[playerDefence] ${genderCheck(player1, 'осмотрелся')}, а [playerKick] ${genderCheck(player2, 'вломил')} дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.`,
        `[playerDefence] ${genderCheck(player1, 'ковырялся')} в зубах, как вдруг, неожиданно [playerKick] отчаянно ${genderCheck(player2, 'размозжил')} плечом мышцы пресса оппонента.`,
        `[playerDefence] ${genderCheck(player1, 'пришел')} в себя, и в это время [playerKick] ${genderCheck(player2, 'провел')} разбивающий удар кистью руки, пробив блок, в голень противника.`,
        `[playerDefence] ${genderCheck(player1, 'пошатнулся')}, а в это время [playerKick] хихикая ${genderCheck(player2, 'влепил')} грубый удар открытой ладонью по бедрам врага.`,
    ],
    defence: [
        `[playerKick] ${genderCheck(player2, 'потерял')} момент и храбрый [playerDefence] ${genderCheck(player1, 'отпрыгнул')} от удара открытой ладонью в ключицу.`,
        `[playerKick] не ${genderCheck(player2, 'контролировал')} ситуацию, и потому [playerDefence] ${genderCheck(player1, 'поставил')} блок на удар пяткой в правую грудь.`,
        `[playerKick] ${genderCheck(player2, 'потерял')} момент и [playerDefence] ${genderCheck(player1, 'поставил')} блок на удар коленом по селезенке.`,
        `[playerKick] ${genderCheck(player2, 'поскользнулся')} и задумчивый [playerDefence] ${genderCheck(player1, 'поставил')} блок на тычок головой в бровь.`,
        `[playerKick] ${genderCheck(player2, 'старался')} провести удар, но непобедимый [playerDefence] ${genderCheck(player1, 'ушел')} в сторону от удара копчиком прямо в пятку.`,
        `[playerKick] ${genderCheck(player2, 'обманулся')} и жестокий [playerDefence] ${genderCheck(player1, 'блокировал')} удар стопой в солнечное сплетение.`,
        `[playerKick] не ${genderCheck(player2, 'думал')} о бое, потому расстроенный [playerDefence] ${genderCheck(player1, 'отпрыгнул')} от удара кулаком куда обычно не бьют.`,
        `[playerKick] ${genderCheck(player2, 'обманулся')} и жестокий [playerDefence] ${genderCheck(player1, 'блокировал')} удар стопой в солнечное сплетение.`
    ],
    draw: 'Ничья - это тоже победа!'
};

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);
//console.log(player1.name.charAt(player1.name.length-2));
//console.log(player1.name.slice(-2));


function genderCheck(player, text) {
    if (femaleCharacters.indexOf(player.name) >=0) {
        if (text.slice(-2) === 'ся') {
            text = text.replace('ся', 'ась');
            console.log('### СЯ' + text);
        }
        else if (text.slice(-2) === 'ал') {
            text = text.replace('ал', 'ала');
            console.log('### АЛ');
        }
         else if (text.slice(-2) === 'ил') {
             text = text.replace('ил', 'ила');
             console.log('### ИЛ');
         }
         else if (text.slice(-2) === 'ул') {
            text = text.replace('ул', 'ула');
            console.log('### ИЛ');
        }
        else if (text.slice(-3) === 'шел') {
            text = text.replace('шел', 'шла');
            console.log('### ЕЛ');
        }
        else if (text.slice(-2) === 'иб') {
            text = text.replace('иб', 'ибла');
            console.log('### ЕЛ');
        }
        else {
            text = text.replace('л', 'ла');
            console.log('### аллл');
        }
    }
      return text;
}


const playerDefence = ['пытался', 'расстроился', 'зажмурился', 'чесал', 'задумался', 'ковырялся', 'вспомнил', 
'осмотрелся', 'кашлянул', 'забылся', 'поперхнулся', 'пришел', 'пошатнулся', 'отпрыгнул', 'поставил', 'ушел',
'блокировал'];

const playerKick = ['раздробил', 'размозжил', 'влепил', 'вломил', 'провел', 'потерял', 'контролировал', 
'поскользнулся', 'старался', 'обманулся', 'думал'];