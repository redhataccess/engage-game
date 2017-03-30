class PreloadState extends Phaser.State {
    preload() {
        console.log('[preload] preloading assets');

        this.game.load.image('title', 'images/title-draft.png');

        this.game.load.image('portal-in',                'images/portal-in.png');
        this.game.load.image('portal-in_glitch_1',       'images/portal-in_glitch_1.png');
        this.game.load.image('portal-in_glitch_2',       'images/portal-in_glitch_2.png');
        this.game.load.image('portal-in_glitch_3',       'images/portal-in_glitch_3.png');
        this.game.load.image('portal-in_glitch_4',       'images/portal-in_glitch_4.png');
        this.game.load.image('portal-in-spin1',          'images/portal-in-spin1.png');
        this.game.load.image('portal-in-spin2',          'images/portal-in-spin2.png');
        this.game.load.image('portal-out',               'images/portal-out.png');

        this.game.load.image('Coffee-sprite',            'images/coffee.png');
        this.game.load.image('Lunch-sprite',             'images/lunch.png');

        this.game.load.image('CVE-sprite',               'images/cve.png');
        this.game.load.image('Labs-sprite',              'images/labs.png');
        this.game.load.image('Shellshock-sprite',        'images/shellshock.png');
        this.game.load.image('Documentation-sprite',     'images/documentation.png');
        this.game.load.image('Discussions-sprite',       'images/discussion.png');
        this.game.load.image('PCM-sprite',               'images/pcm.png');

        this.game.load.image('ContainerCatalog-sprite',  'images/container-catalog.png');
        this.game.load.image('PackageSearch-sprite',     'images/package-search.png');
        this.game.load.image('square-blue3',             'images/square-blue3.png');
        this.game.load.image('square-blue1',             'images/square-blue1.png');

        this.game.data = {
            leap: new LeapController()
        };
    }

    create() {
        this.state.start('SplashState');
    }
}

