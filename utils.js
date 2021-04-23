export const randomizer = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export function date() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let secundes = date.getSeconds();
    if (hours < 10) {
        hours='0'+hours;
    }
    if (minutes < 10) {
        minutes='0'+minutes;
    }
    if (secundes < 10) {
        secundes='0'+secundes;
    }
    const currentTime =  `${hours}:${minutes}:${secundes}`;
    return currentTime;
};

export function playSound(sfxName) {
    const soundFX = document.getElementById("soundFX");
    soundFX.src = `/assets/sounds/${sfxName}.mp3`;
    soundFX.play();
}