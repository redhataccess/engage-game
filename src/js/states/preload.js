class PreloadState extends Phaser.State {
    preload() {
        console.log('[preload] preloading assets');
        this.game.load.image('square', '../images/square.png');
    }

    create() {
        this.state.start('SplashState');
    }
}

