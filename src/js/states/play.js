class PlayState extends Phaser.State {
    create() {
        this.sprite = game.add.sprite(0, 0, 'square');
        this.sprite.position.x = this.game.world.centerX;
    }

    update() {
        this.sprite.position.add(0, 1);
    }
}
