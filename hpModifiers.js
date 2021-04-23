export function changeHP(damage) {
    if (this.hp < damage) {
        this.hp = 0;
    } else {
        this.hp -= damage;
    }
}

export function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

export function renderHP() {
    this.elHP().style.width = this.hp + '%';
}