class Game extends Phaser.Game {
    constructor() {
        super(
            1440, //window.innerWidth,
            810, //window.innerHeight,
            Phaser.AUTO,
            'phaser-engage',
            null,
            true,
            true
        );

        this.state.add('BootState'    , BootState    , false);
        this.state.add('PreloadState' , PreloadState , false);
        this.state.add('SplashState'  , SplashState  , false);
        this.state.add('PlayState'    , PlayState    , false);

        this.state.start('BootState');
    }
}
