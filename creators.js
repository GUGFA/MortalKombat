export let createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    (className) ? $tag.classList.add(className) : null
    return $tag;
};

export function createPlayer(playerObj) {
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

export function showBanner(imageSource = "/assets/LetsKeep.png") {
    const $banner = createElement('div', 'banner');
    const $img = createElement('img');
    const $arenas = document.querySelector('.arenas');

    $img.src = imageSource;
    $banner.appendChild($img);
    $arenas.appendChild($banner);

    setTimeout(function(){$banner.style.display = 'none';}, 1000);
}