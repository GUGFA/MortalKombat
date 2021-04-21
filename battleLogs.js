import {$femaleCharacters, $chat} from './main.js';
import {date, randomizer} from './utils.js';

export const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        `Результат удара [playerWins]: [playerLose] - труп`,
        `[playerLose] 'погиб')} от удара бойца [playerWins]`,
        `Результат боя: [playerLose] - жертва, [playerWins] - убийца`,
    ],
    hit: [
        `[playerDefence]  'пытался')} сконцентрироваться, но [playerKick] разбежавшись   'раздробил')} копчиком левое ухо врага.`,
        `[playerDefence] 'расстроился')}, как вдруг, неожиданно [playerKick] случайно   'раздробил')} грудью грудину противника.`,
        `[playerDefence]   'зажмурился')}, а в это время [playerKick], прослезившись,   'раздробил')} кулаком пах оппонента.`,
        `[playerDefence]   'чесал')} <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно   'размозжил')} грудью левый бицепс оппонента.`,
        `[playerDefence]   'ковырялся')} в зубах, но [playerKick] проснувшись   'влепил')} тяжелый удар пальцем в кадык врага.`,
        `[playerDefence]   'вспомнил')} что-то важное, но внезапно [playerKick] зевнув,   'размозжил')} открытой ладонью челюсть противника.`,
        `[playerDefence]   'осмотрелся')}, и в это время [playerKick] мимоходом   'раздробил')} стопой аппендикс соперника.`,
        `[playerDefence]   'кашлянул')}, но внезапно [playerKick] показав палец,   'размозжил')} пальцем грудь соперника.`,
        `[playerDefence]   'пытался')} что-то сказать, а жестокий [playerKick] проснувшись   'размозжил')} копчиком левую ногу противника.`,
        `[playerDefence]   'забылся')}, как внезапно безумный [playerKick] со скуки,   'влепил')} удар коленом в левый бок соперника.`,
        `[playerDefence]   'поперхнулся')}, а за это [playerKick] мимоходом   'раздробил')} коленом висок врага.`,
        `[playerDefence]   'расстроился')}, а в это время наглый [playerKick] пошатнувшись   'размозжил')} копчиком губы оппонента.`,
        `[playerDefence]   'осмотрелся')}, но внезапно [playerKick] робко   'размозжил')} коленом левый глаз противника.`,
        `[playerDefence]   'осмотрелся')}, а [playerKick]   'вломил')} дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.`,
        `[playerDefence]   'ковырялся')} в зубах, как вдруг, неожиданно [playerKick] отчаянно   'размозжил')} плечом мышцы пресса оппонента.`,
        `[playerDefence]   'пришел')} в себя, и в это время [playerKick]   'провел')} разбивающий удар кистью руки, пробив блок, в голень противника.`,
        `[playerDefence]   'пошатнулся')}, а в это время [playerKick] хихикая   'влепил')} грубый удар открытой ладонью по бедрам врага.`,
    ],
    defence: [
        `[playerKick]   'потерял')} момент и храбрый [playerDefence]   'отпрыгнул')} от удара открытой ладонью в ключицу.`,
        `[playerKick] не   'контролировал')} ситуацию, и потому [playerDefence]   'поставил')} блок на удар пяткой в правую грудь.`,
        `[playerKick]   'потерял')} момент и [playerDefence]   'поставил')} блок на удар коленом по селезенке.`,
        `[playerKick]   'поскользнулся')} и задумчивый [playerDefence]   'поставил')} блок на тычок головой в бровь.`,
        `[playerKick]   'старался')} провести удар, но непобедимый [playerDefence]   'ушел')} в сторону от удара копчиком прямо в пятку.`,
        `[playerKick]   'обманулся')} и жестокий [playerDefence]   'блокировал')} удар стопой в солнечное сплетение.`,
        `[playerKick] не   'думал')} о бое, потому расстроенный [playerDefence]   'отпрыгнул')} от удара кулаком куда обычно не бьют.`,
        `[playerKick]   'обманулся')} и жестокий [playerDefence]   'блокировал')} удар стопой в солнечное сплетение.`
    ],
    draw: 'Ничья - это тоже победа!'
};

function genderCheck(player, text) {
    if ($femaleCharacters.indexOf(player.name) >=0) {
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

export function generateLogs(type, player1, player2, damage = 0) {
    let text = logs[type];
    let el = '';
    console.log(text);
    switch (type) {
        case 'start':
            console.log('#### start')
            text = text.replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', `${date()}`).replace(' ', ' ').replace(' ', ' ');
            el = `<p>${text}</p>`;
           break;

        case 'end':
            text = text[randomizer(0, logs[type].length-1)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            el = `<p>${text}</p>`;
            break;

        case 'hit':
        case 'defence':
            text = text[randomizer(0, text.length-1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            const color = damage === 0 ? 'green':'red';
            el = `<p>${date()} ${text} <span style="color:${color}"> -${damage} </span>  ${[player2.hp]}/100</p>`;
            break;

        // default:
        //         el = `<p>${text}</p>`;

    }
  $chat.insertAdjacentHTML('afterbegin', el);
}