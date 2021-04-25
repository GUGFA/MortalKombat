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

export const player1 = new Player({
    player: 1,
    name: 'Scorpion',
    hp: 10,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
})

export const player2 = new Player({
    player: 2,
    name: 'Kitana',
    hp: 10,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
})