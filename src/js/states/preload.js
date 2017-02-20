class PreloadState extends Phaser.State {
    preload() {
        console.log('[preload] preloading assets');

        this.game.load.image('title', '../images/title-draft.png');

        this.game.load.image('portal-in', '../images/portal-in.png');

        this.game.load.image('square-red1', '../images/square-red1.png');
        this.game.load.image('square-red2', '../images/square-red2.png');
        this.game.load.image('square-red3', '../images/square-red3.png');
        this.game.load.image('square-teal', '../images/square-teal.png');
        this.game.load.image('square-blue1', '../images/square-blue1.png');
        this.game.load.image('square-blue3', '../images/square-blue3.png');
    }

    create() {
        this.state.start('SplashState');
    }
}

