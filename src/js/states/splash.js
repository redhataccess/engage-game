class SplashState extends Phaser.State {
    create() {
        console.log('[splash] showing splash screen');

        const title = this.game.add.sprite(0, 0, 'title');

        title.position.set(
            this.game.world.width / 2 - title.width / 2,
            this.game.world.height / 2 - title.height / 2
        );

        const splashTime = Phaser.Timer.SECOND * 2;

        this.game.time.events.add(splashTime, this.next, this);
    }

    next() {
        this.state.start('PlayState');
    }
}

