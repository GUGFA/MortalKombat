class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
    }

    elHP = () => document.querySelector('.player' + this.player + ' .life');
    changeHP = (damage) => {
        if (this.hp < damage) {
            this.hp = 0;
        } else {
            this.hp -= damage;
        }
    };
    renderHP = () => this.elHP().style.width = this.hp + '%';
    attack = () => console.log(this.name + ' ' + 'Fight...');
}

export let player1;
export let player2;

class Game {
    getPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
        return body;
    }

    start = async () => {
        const pla1 = JSON.parse(localStorage.getItem('player1'));
        const pla2 = await this.getPlayers();
        const p1 = pla1;
        const p2 = pla2;

        player1 = new Player({
            ...p1,
            player:1,
            rootSelector: 'arenas',
        });
        player2 = new Player({
            ...p2,
            player:2,
            rootSelector: 'arenas',
        });
    }
}
const game = new Game();
game.start();