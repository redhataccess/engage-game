class PreloadState extends Phaser.State {
    preload() {
        console.log('[preload] preloading assets');

        this.game.load.image('title', 'images/title-draft.png');

        this.game.load.image('portal-in', 'images/portal-in.png');

        this.game.load.image('Coffee-sprite',           'images/coffee.png');
        this.game.load.image('Lunch-sprite',           'images/lunch.png');

        this.game.load.image('PCM-sprite',              'images/square-red1.png');
        this.game.load.image('ContainerCatalog-sprite', 'images/square-red2.png');
        this.game.load.image('CVE-sprite',              'images/square-red3.png');
        this.game.load.image('Documentation-sprite',    'images/square-teal.png');
        this.game.load.image('Labs-sprite',             'images/square-blue1.png');
        this.game.load.image('Discussions-sprite',      'images/square-blue3.png');
        this.game.load.image('PackageSearch-sprite',    'images/square-blue3.png');
        this.game.load.image('square-blue3',            'images/square-blue3.png');
    }

    create() {
        this.state.start('SplashState');
    }
}

