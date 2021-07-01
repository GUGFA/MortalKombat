import {
    player1,
    player2
} from './playerclass.js';

//import {startAnimation} from './animation.js';

class Attacks {
    constructor(props) {
        this.value = props.value;
        this.hit = props.hit;
        this.defence = props.defence;
    }
}
export default class Game {
    constructor(props) {}

static  animationInterval1;
static  animationInterval2;
static  animationState1 = 'idle';
static  animationState2 = 'idle';

static  widthOfSpriteSheet = 1170;
static  widthOfEachSprite = 130;
static spriteSheet;
static spriteSheet2;


    static $arenas = document.querySelector('.arenas');
    static $formFight = document.querySelector('.control');
    static $chat = document.querySelector('.chat');
    static $gameStart = document.querySelector('.start');
    static $radioButton = document.getElementsByClassName('radiobutton');
    static $randomButton = document.querySelector('.button');

    static eventListener = () => {
        Game.$formFight.addEventListener('submit', async function (e) {
            e.preventDefault();
            const attacks = await Game.getAttacks();
            const enemy = attacks.player2;
            const player = attacks.player1;
            console.log('### player ', player);
            console.log('### enemy ', enemy);


            if (player.defence !== enemy.hit) {
                let a = 0;
                do {
                    console.log(a);
                    a++;}
                 while (a < 100);
                //setTimeout (() => {console.log('waiting1')}, 100);
                console.log(Game.animationState1);
                Game.animationState1 = `hit${player.defence}`;
                Game.animationState2 = enemy.hit;
                console.log('%% animationState1',Game.animationState1);
                
                // console.log('%% animationState1',Game.animationState1);
                // console.log('%% animationState2',Game.animationState2);
                player1.changeHP(enemy.value);
                player1.renderHP();
                Game.generateLogs('hit', player2, player1, enemy.value);
            }
            if (enemy.defence !== player.hit) {
                let a = 0;
                do {
                    console.log(a);
                    a++;}
                 while (a < 100);
                Game.animationState1 = player.hit;
                Game.animationState2 = `hit${enemy.defence}`;
                console.log('%% animationState1',Game.animationState1);
                // console.log('%% animationState1',Game.animationState1);
                // console.log('%% animationState2',Game.animationState2);
                player2.changeHP(player.value);
                player2.renderHP();
                Game.generateLogs('hit', player1, player2, player.value);
            }
            if (player.hit === enemy.defence) {
                let a = 0;
                do {
                    console.log(a);
                    a++;}
                 while (a < 100);
                Game.animationState1 = player.hit;
                Game.animationState2 = `block${enemy.defence}`;
                console.log('%% animationState1',Game.animationState1);
                Game.generateLogs('defence', player1, player2);
            }
            if (enemy.hit === player.defence) {
                let a = 0;
                do {
                    console.log(a);
                    a++;}
                 while (a < 100);
                Game.animationState1 = `block${player.defence}`;
                Game.animationState2 = enemy.hit;
                console.log('%% animationState1',Game.animationState1);
                Game.generateLogs('defence', player2, player1);
            }
            Game.showResult();
        });
    }

    static playSound = (sfxName = 'Fight') => {
        const soundFX = document.getElementById("soundFX");
        soundFX.src = `/assets/sounds/${sfxName}.mp3`;
        soundFX.play();
    }

    //static getElement = (id) => document.getElementById(id);


    static createPlayer = (playerObj) => {
        const $player = Game.createElement('div', 'player' + playerObj.player);
        const $progressBar = Game.createElement('div', 'progressbar');
        const $character = Game.createElement('div', 'character');
        const $life = Game.createElement('div', 'life');
        const $name = Game.createElement('div', 'name');
        const $spriteSheet = Game.createElement('div', 'spriteSheet');
        //const $img = Game.createElement('img', 'Temp');


        $life.style.width = (playerObj.hp + '%');
        $name.innerText = playerObj.name;
        //$img.src = playerObj.img;
        $spriteSheet.setAttribute("id", 'player' + playerObj.player);
       
        $player.appendChild($progressBar);
        $player.appendChild($character);
        $progressBar.appendChild($life);
        $progressBar.appendChild($name);
        //$character.appendChild($img);
        $character.appendChild($spriteSheet);

        // Game.spriteSheet = document.getElementById('player1');
        // Game.spriteSheet2 = document.getElementById('player2');
        return $player;
    }


    gameStart = () => {
        //  Game.$gameStart.addEventListener('click', function () {
            setTimeout(() => Game.$formFight.style.display = 'flex', 1500);
            //  Game.$arenas.removeChild(Game.$gameStart);
            setTimeout(() => document.getElementById("mortalkombat").play(), 1500);
            setTimeout(Game.playSound, 500);
            setTimeout(Game.showBanner, 600);

            Game.$arenas.appendChild(Game.createPlayer(player1));
            Game.$arenas.appendChild(Game.createPlayer(player2));
            document.getElementById('player1').style.background=`url(./assets/characters/${player1.name}/Idle/${player1.name}_Idle.png)`;
            //document.getElementById('player1').style.background=`url(./assets/characters/Scorpion/Idle/Scorpion_Idle.png)`;
            //document.getElementById('player1').style.backgroundSize="130px 142px";
            //document.getElementById('player1').style.backgroundRepeat="no-repeat";
            document.getElementById('player2').style.background=`url(${player2.img})`;
            document.getElementById('player2').style.backgroundSize="150px 268px";
            //starting anims loop//
            Game.spriteSheet = document.getElementById('player1');
            Game.spriteSheet2 = document.getElementById('player2');
            // console.log(player1.name)
            Game.startAnimation(Game.spriteSheet, 130, 1170, player1.name);
            Game.startAnimation(Game.spriteSheet2, 130, 1170, player2.name);
            Game.generateLogs('start', player1, player2);
            Game.eventListener();

        //  });
    }

    static async startAnimation(player, spriteWidth = widthOfEachSprite, atlasWidth = widthOfSpriteSheet, character) {
        console.log('############# animaton started')
        let position = spriteWidth;
        const speed = 80;
        const diff = spriteWidth;
        const playerType = player;
        // console.log('@@@@ Startanimation Player',player);
        // console.log('SpriteSheet',Game.spriteSheet);
        // console.log('&&&Character',character);
      
        function detectInterval() {
          player === Game.spriteSheet ? clearInterval(Game.animationInterval1) : clearInterval(Game.animationInterval2);
        }
      
        function detectAnimationState() {
          if (player === Game.spriteSheet) {
            //  console.log('detectAnimationState Player1',Game.animationState1);
            return Game.animationState1;
            
          }
          else {
            //   console.log('detectAnimationState Player2',Game.animationState2);
              return Game.animationState2;
          }
        }
      
        function setAnimationState(type) {
            // console.log('####setAnimationState',player);
          player === Game.spriteSheet ? Game.animationState1 = type : Game.animationState2 = type;
        //   console.log('### Game.animationState1',Game.animationState1);
        //   console.log('### Game.animationState2',Game.animationState2);
        }
      
        function setAnimation(widthOfSprite, widthOfAtlas, action, type = 'play') {
          detectInterval();
          setAnimationState(type);
        //   console.log('@@@@Setanimation PlayerBefore', player);
        //   console.log('###Charecter',character);
        //   console.log('player1.name',player1.name);
        //   console.log('@@@Action',action);
          player.style.background = `url(./${character}/${action}/${character}_${action}.png)`;
        //   console.log('@@@@Setanimation PlayerAfter', player);
          Game.startAnimation(player, widthOfSprite, widthOfAtlas, character);
        }
      
      
        function playInterval() {
        console.log('##AnimState1', Game.animationState1);
        console.log('##AnimState2', Game.animationState2);
          playerType.style.backgroundPosition = `-${position}px 0px`;
          if (position === atlasWidth) {
            switch (detectAnimationState()) {
              case 'play':
                setAnimation(130, 1170, 'idle', 'idle');
                break;
              case 'head':
                setAnimation(114, 1140, 'PunchHead');
                break;
              case 'foot':
                setAnimation(114, 1254, 'PunchFoot');
                break;
              case 'body':
                setAnimation(130, 1690, 'KickBody');
                break;
              case 'hithead':
                setAnimation(74, 518, 'HitHead');
                break;
              case 'hitfoot':
                setAnimation(78, 936, 'HitFoot');
                break;
              case 'hitbody':
                setAnimation(74, 518, 'HitBody');
                break;
              case 'blockhead':
                setAnimation(74, 666, 'BlockHead');
                break;
              case 'blockbody':
                setAnimation(74, 666, 'BlockHead');
                break;
              case 'blockfoot':
                setAnimation(80, 960, 'BlockFoot');
                break;
              case 'dizzy':
                setAnimation(70, 630, 'Dizzy', '');
                break;
              case 'victory':
                setAnimation(105, 735, 'Victory', 'stop');
                break;
              case 'stop':
                detectInterval();
                playerType.style.backgroundPosition = `${spriteWidth}px 0px`;
                break;
              default:
                position = spriteWidth;
                break;
            }
          }
          else if (position < atlasWidth) {
            position = position + diff;
            } 
          else {
            position = spriteWidth;
            }
        }
      
        if (player === Game.spriteSheet) {
        Game.animationInterval1 = setInterval(() => {
          playInterval()}, speed);
        } else {
          Game.animationInterval2 = setInterval(() => {
          playInterval()}, speed);
        }
      }

    static createReloadButton = () => {
        const $restartBtn = Game.createElement('button', 'button');
        const $restartDiv = Game.createElement('div', 'reloadWrap');
        document.getElementById("mortalkombat").pause();
        $restartBtn.innerText = 'Restart';
        $restartBtn.addEventListener('click', function () {
            //window.location.reload();
            window.location.pathname = 'index.html';
        });
        Game.$formFight.style.display = 'none';
        $restartDiv.appendChild($restartBtn);
        Game.$arenas.appendChild($restartDiv);

        return $restartDiv;
    }

    static playerWin = (name) => {
        const $winTitle = Game.createElement('div', 'loseTitle');
        (name) ? $winTitle.innerText = name + ' WINS': $winTitle.innerText = 'DRAW';
        setTimeout(Game.playSound.bind(null, `${$winTitle.innerText}`), 100);
        return $winTitle;
    };

    static showResult = () => {
        if (player1.hp === 0 || player2.hp === 0) {
            for (let i = 0; i < Game.$radioButton.length; i++) {
                Game.$radioButton[i].setAttribute("disabled", "disabled");
            }
            Game.$randomButton.disabled = true;
            Game.createReloadButton();
        }
        if (player1.hp === 0 && player1.hp < player2.hp) {
            Game.$arenas.appendChild(Game.playerWin(player2.name));
            Game.animationState1 = 'dizzy';
            Game.animationState2 = 'victory';
            Game.generateLogs('end', player2, player1);
        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            Game.$arenas.appendChild(Game.playerWin(player1.name));
            Game.animationState1 = 'victory';
            Game.animationState2 = 'dizzy';
            Game.generateLogs('end', player1, player2);
        } else if (player1.hp === 0 && player2.hp === 0) {
            Game.$arenas.appendChild(Game.playerWin());
            Game.animationState1 = 'dizzy';
            Game.animationState2 = 'dizzy';
            Game.generateLogs('draw');
        }

    }

    static getAttacks = async () => {
        let submit = {};

        for (let item of Game.$formFight) {
            if (item.checked && item.name === 'hit') {
                submit.hit = item.value;
            }
            if (item.checked && item.name === 'defence') {
                submit.defence = item.value;
            }
            item.checked = false;
        }

        const getHits = async () => {
            const answer = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
                method: 'POST',
                body: JSON.stringify(submit)
            }).then(res => res.json());
            return answer;
        }

        let playersHits = await getHits();
        return playersHits;
    }

    static randomizer = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    static date = () => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let secundes = date.getSeconds();
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (secundes < 10) {
            secundes = '0' + secundes;
        }
        const currentTime = `${hours}:${minutes}:${secundes}`;
        return currentTime;
    };



    static createElement = (tag, className) => {
        const $tag = document.createElement(tag);
        (className) ? $tag.classList.add(className): null
        return $tag;
    };


    static showBanner = (imageSource = "/assets/LetsKeep.png") => {
        const $banner = Game.createElement('div', 'banner');
        const $img = Game.createElement('img');
        const $arenas = document.querySelector('.arenas');

        $img.src = imageSource;
        $banner.appendChild($img);
        $arenas.appendChild($banner);

        setTimeout(function () {
            $banner.style.display = 'none';
        }, 1000);
    }

    static $femaleCharacters = ['Sonya', 'Kitana', 'Jade', 'Mileena', 'Khameleon', 'Sheeva', 'Sindel'];

    static logs = {
        start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
        end: [
            `Результат удара [playerWins]: [playerLose] - труп`,
            `[playerLose]  погиб от удара бойца [playerWins]`,
            `Результат боя: [playerLose] - жертва, [playerWins] - убийца`,
        ],
        hit: [
            `[playerDefence]  пытался сконцентрироваться, но [playerKick] разбежавшись  раздробил копчиком левое ухо врага.`,
            `[playerDefence]  расстроился, как вдруг, неожиданно [playerKick] случайно  раздробил грудью грудину противника.`,
            `[playerDefence]  зажмурился, а в это время [playerKick], прослезившись,  раздробил кулаком пах оппонента.`,
            `[playerDefence]  чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно  размозжил грудью левый бицепс оппонента.`,
            `[playerDefence]  ковырялся в зубах, но [playerKick] проснувшись  влепил тяжелый удар пальцем в кадык врага.`,
            `[playerDefence]  вспомнил что-то важное, но внезапно [playerKick] зевнув,  размозжил открытой ладонью челюсть противника.`,
            `[playerDefence]  осмотрелся, и в это время [playerKick] мимоходом  раздробил стопой аппендикс соперника.`,
            `[playerDefence]  кашлянул, но внезапно [playerKick] показав палец,  размозжил пальцем грудь соперника.`,
            `[playerDefence]  пытался что-то сказать, а жестокий [playerKick] проснувшись  размозжил копчиком левую ногу противника.`,
            `[playerDefence]  забылся, как внезапно безумный [playerKick] со скуки,  влепил удар коленом в левый бок соперника.`,
            `[playerDefence]  поперхнулся, а за это [playerKick] мимоходом  раздробил коленом висок врага.`,
            `[playerDefence]  расстроился, а в это время наглый [playerKick] пошатнувшись  размозжил копчиком губы оппонента.`,
            `[playerDefence]  осмотрелся, но внезапно [playerKick] робко  размозжил коленом левый глаз противника.`,
            `[playerDefence]  осмотрелся, а [playerKick]  вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.`,
            `[playerDefence]  ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно  размозжил плечом мышцы пресса оппонента.`,
            `[playerDefence]  пришел в себя, и в это время [playerKick]  провел разбивающий удар кистью руки, пробив блок, в голень противника.`,
            `[playerDefence]  пошатнулся, а в это время [playerKick] хихикая  влепил грубый удар открытой ладонью по бедрам врага.`,
        ],
        defence: [
            `[playerKick]  потерял момент и храбрый [playerDefence]  отпрыгнул от удара открытой ладонью в ключицу.`,
            `[playerKick] не  контролировал ситуацию, и потому [playerDefence]  поставил блок на удар пяткой в правую грудь.`,
            `[playerKick]  потерял момент и [playerDefence]  поставил блок на удар коленом по селезенке.`,
            `[playerKick]  поскользнулся и задумчивый [playerDefence]  поставил блок на тычок головой в бровь.`,
            `[playerKick]  старался провести удар, но непобедимый [playerDefence]  ушел в сторону от удара копчиком прямо в пятку.`,
            `[playerKick]  обманулся и жестокий [playerDefence]  блокировал удар стопой в солнечное сплетение.`,
            `[playerKick] не  думал о бое, потому расстроенный [playerDefence]  отпрыгнул от удара кулаком куда обычно не бьют.`,
            `[playerKick]  обманулся и жестокий [playerDefence]  блокировал удар стопой в солнечное сплетение.`
        ],
        draw: 'Ничья - это тоже победа!'
    };

    static genderCheck = (player, text) => {
        if (Game.$femaleCharacters.indexOf(player.name) >= 0) {
            switch (text) {
                case text.slice(-2) === 'ся':
                    text = text.replace('ся', 'ась');
                    break;
                case text.slice(-2) === 'ал':
                    text = text.replace('ал', 'ала');
                    break;
                case text.slice(-2) === 'ил':
                    text = text.replace('ил', 'ила');
                    break;
                case text.slice(-2) === 'ул':
                    text = text.replace('ул', 'ула');
                    break;
                case text.slice(-3) === 'шел':
                    text = text.replace('шел', 'шла');
                    break;
                case text.slice(-2) === 'иб':
                    text = text.replace('иб', 'ибла');
                    break;
                default:
                    text = text.replace('л', 'ла');
                    break;
            }
        }
        return text;
    }

    static generateLogs = (type, player1, player2, damage = 0) => {
        let text = Game.logs[type];
        let el = '';
        switch (type) {
            case 'start':
                text = text.replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', `${Game.date()}`).replace(' ', ' ').replace(' ', ' ');
                el = `<p>${text}</p>`;
                break;

            case 'end':
                text = text[Game.randomizer(0, Game.logs[type].length - 1)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
                el = `<p>${text}</p>`;
                break;

            case 'hit':
            case 'defence':
                text = text[Game.randomizer(0, text.length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
                const color = damage === 0 ? 'green' : 'red';
                el = `<p>${Game.date()} ${text} <span style="color:${color}"> -${damage} </span>  ${[player2.hp]}/100</p>`;
                break;
        }
        Game.$chat.insertAdjacentHTML('afterbegin', el);
    }
}