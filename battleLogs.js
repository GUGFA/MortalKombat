// import {$chat} from './main.js';
// import {date, randomizer} from './utils.js';
// import {player1, player2} from './playerclass.js';

// const $femaleCharacters = ['Sonya', 'Kitana', 'Jade', 'Mileena', 'Khameleon', 'Sheeva', 'Sindel'];

// export const logs = {
//     start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
//     end: [
//             `Результат удара [playerWins]: [playerLose] - труп`,
//             `[playerLose] ${genderCheck(player2, 'погиб')} от удара бойца [playerWins]`,
//             `Результат боя: [playerLose] - жертва, [playerWins] - убийца`,
//     ],
//     hit: [
//         `[playerDefence] ${genderCheck(player1, 'пытался')} сконцентрироваться, но [playerKick] разбежавшись ${genderCheck(player2, 'раздробил')} копчиком левое ухо врага.`,
//         `[playerDefence] ${genderCheck(player1, 'расстроился')}, как вдруг, неожиданно [playerKick] случайно ${genderCheck(player2, 'раздробил')} грудью грудину противника.`,
//         `[playerDefence] ${genderCheck(player1, 'зажмурился')}, а в это время [playerKick], прослезившись, ${genderCheck(player2, 'раздробил')} кулаком пах оппонента.`,
//         `[playerDefence] ${genderCheck(player1, 'чесал')} <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно ${genderCheck(player2, 'размозжил')} грудью левый бицепс оппонента.`,
//         `[playerDefence] ${genderCheck(player1, 'ковырялся')} в зубах, но [playerKick] проснувшись ${genderCheck(player2, 'влепил')} тяжелый удар пальцем в кадык врага.`,
//         `[playerDefence] ${genderCheck(player1, 'вспомнил')} что-то важное, но внезапно [playerKick] зевнув, ${genderCheck(player2, 'размозжил')} открытой ладонью челюсть противника.`,
//         `[playerDefence] ${genderCheck(player1, 'осмотрелся')}, и в это время [playerKick] мимоходом ${genderCheck(player2, 'раздробил')} стопой аппендикс соперника.`,
//         `[playerDefence] ${genderCheck(player1, 'кашлянул')}, но внезапно [playerKick] показав палец, ${genderCheck(player2, 'размозжил')} пальцем грудь соперника.`,
//         `[playerDefence] ${genderCheck(player1, 'пытался')} что-то сказать, а жестокий [playerKick] проснувшись ${genderCheck(player2, 'размозжил')} копчиком левую ногу противника.`,
//         `[playerDefence] ${genderCheck(player1, 'забылся')}, как внезапно безумный [playerKick] со скуки, ${genderCheck(player2, 'влепил')} удар коленом в левый бок соперника.`,
//         `[playerDefence] ${genderCheck(player1, 'поперхнулся')}, а за это [playerKick] мимоходом ${genderCheck(player2, 'раздробил')} коленом висок врага.`,
//         `[playerDefence] ${genderCheck(player1, 'расстроился')}, а в это время наглый [playerKick] пошатнувшись ${genderCheck(player2, 'размозжил')} копчиком губы оппонента.`,
//         `[playerDefence] ${genderCheck(player1, 'осмотрелся')}, но внезапно [playerKick] робко ${genderCheck(player2, 'размозжил')} коленом левый глаз противника.`,
//         `[playerDefence] ${genderCheck(player1, 'осмотрелся')}, а [playerKick] ${genderCheck(player2, 'вломил')} дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.`,
//         `[playerDefence] ${genderCheck(player1, 'ковырялся')} в зубах, как вдруг, неожиданно [playerKick] отчаянно ${genderCheck(player2, 'размозжил')} плечом мышцы пресса оппонента.`,
//         `[playerDefence] ${genderCheck(player1, 'пришел')} в себя, и в это время [playerKick] ${genderCheck(player2, 'провел')} разбивающий удар кистью руки, пробив блок, в голень противника.`,
//         `[playerDefence] ${genderCheck(player1, 'пошатнулся')}, а в это время [playerKick] хихикая ${genderCheck(player2, 'влепил')} грубый удар открытой ладонью по бедрам врага.`,
//     ],
//     defence: [
//         `[playerKick] ${genderCheck(player2, 'потерял')} момент и храбрый [playerDefence] ${genderCheck(player1, 'отпрыгнул')} от удара открытой ладонью в ключицу.`,
//         `[playerKick] не ${genderCheck(player2, 'контролировал')} ситуацию, и потому [playerDefence] ${genderCheck(player1, 'поставил')} блок на удар пяткой в правую грудь.`,
//         `[playerKick] ${genderCheck(player2, 'потерял')} момент и [playerDefence] ${genderCheck(player1, 'поставил')} блок на удар коленом по селезенке.`,
//         `[playerKick] ${genderCheck(player2, 'поскользнулся')} и задумчивый [playerDefence] ${genderCheck(player1, 'поставил')} блок на тычок головой в бровь.`,
//         `[playerKick] ${genderCheck(player2, 'старался')} провести удар, но непобедимый [playerDefence] ${genderCheck(player1, 'ушел')} в сторону от удара копчиком прямо в пятку.`,
//         `[playerKick] ${genderCheck(player2, 'обманулся')} и жестокий [playerDefence] ${genderCheck(player1, 'блокировал')} удар стопой в солнечное сплетение.`,
//         `[playerKick] не ${genderCheck(player2, 'думал')} о бое, потому расстроенный [playerDefence] ${genderCheck(player1, 'отпрыгнул')} от удара кулаком куда обычно не бьют.`,
//         `[playerKick] ${genderCheck(player2, 'обманулся')} и жестокий [playerDefence] ${genderCheck(player1, 'блокировал')} удар стопой в солнечное сплетение.`
//     ],
//     draw: 'Ничья - это тоже победа!'
// };

// function genderCheck(player, text) {
//     if ($femaleCharacters.indexOf(player.name) >=0) {
//         switch (text) {
//             case text.slice(-2) === 'ся':
//                 text = text.replace('ся', 'ась');
//                 break;
//             case text.slice(-2) === 'ал':
//                 text = text.replace('ал', 'ала');
//                 break;
//             case text.slice(-2) === 'ил':
//                 text = text.replace('ил', 'ила');
//                 break;
//             case text.slice(-2) === 'ул':
//                 text = text.replace('ул', 'ула');
//                 break;
//             case text.slice(-3) === 'шел':
//                 text = text.replace('шел', 'шла');
//                 break;
//             case text.slice(-2) === 'иб':
//                 text = text.replace('иб', 'ибла');
//                 break;
//             default:
//                 text = text.replace('л', 'ла');
//                 break;
//         }
//     }
//       return text;
// }

// export function generateLogs(type, player1, player2, damage = 0) {
//     let text = logs[type];
//     let el = '';
//     switch (type) {
//         case 'start':
//             text = text.replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', `${date()}`).replace(' ', ' ').replace(' ', ' ');
//             el = `<p>${text}</p>`;
//            break;

//         case 'end':
//             text = text[randomizer(0, logs[type].length-1)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
//             el = `<p>${text}</p>`;
//             break;

//         case 'hit':
//         case 'defence':
//             text = text[randomizer(0, text.length-1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
//             const color = damage === 0 ? 'green':'red';
//             el = `<p>${date()} ${text} <span style="color:${color}"> -${damage} </span>  ${[player2.hp]}/100</p>`;
//             break;
//     }
//   $chat.insertAdjacentHTML('afterbegin', el);
// }