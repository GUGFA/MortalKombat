
const getElement = (id) => document.getElementById(id);
const spriteSheet = getElement('player1');
const spriteSheet2 = getElement('player2');


let animationInterval1;
let animationInterval2;
let animationState1 = 'idle';
let animationState2 = 'idle';

const widthOfSpriteSheet = 1170;
const widthOfEachSprite = 130;


export function startAnimation(player, spriteWidth = widthOfEachSprite, atlasWidth = widthOfSpriteSheet, character = 'Scorpion') {
  let position = spriteWidth;
  const speed = 80;
  const diff = spriteWidth;
  const playerType = player;

  function detectInterval() {
    player === spriteSheet ? clearInterval(animationInterval1) : clearInterval(animationInterval2);
  }

  function detectAnimationState() {
    if (player === spriteSheet) {return animationState1;
    }
    else {return animationState2;
    }
  }

  function setAnimationState(type) {
    player === spriteSheet ? animationState1 = type : animationState2 = type;
  }

  function setAnimation(widthOfSprite, widthOfAtlas, action, type = 'play') {
    detectInterval();
    setAnimationState(type);
    player.style.background = `url(./${character}/${action}/${character}_${action}.png)`;
    startAnimation(player, widthOfSprite, widthOfAtlas);
  }


  function playInterval() {
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

  if (player === spriteSheet) {
  animationInterval1 = setInterval(() => {
    playInterval()}, speed);
  } else {
    animationInterval2 = setInterval(() => {
    playInterval()}, speed);
  }
}
startAnimation(spriteSheet, 130, 1170);
startAnimation(spriteSheet2, 130, 1170);