class SplashState extends Phaser.State {
    create() {
        console.log('[splash] showing splash screen');

        const splashText = 'ENGAGE';

        const style = {
            font: '65px monospace',
            fill: '#cc0000',
            align: 'center'
        };

        const splashTime = Phaser.Timer.SECOND * 2;

        this.game.add.text(this.game.world.centerX, 100, splashText, style);
        this.game.time.events.add(splashTime, this.next, this);
    }

    next() {
        this.state.start('PlayState');
    }
}

