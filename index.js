const $gameStart = document.querySelector('.start');
const changePage = () => window.location.pathname='players.html';

gameStart = () => { 
    $gameStart.addEventListener('click', function () {
    document.getElementById("soundFX").play();
    setTimeout(changePage, 2000);
    });
}

gameStart();