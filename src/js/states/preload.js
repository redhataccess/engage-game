class PreloadState extends Phaser.State {
    preload() {
        console.log('[preload] preloading assets');

        this.game.load.image('title', 'images/title-draft.png');

        this.game.load.image('portal-in',                'images/portal-in-test.png');
        this.game.load.image('portal-in-border1',        'images/portal-border-1.png');
        this.game.load.image('portal-in-border2',        'images/portal-border-2.png');
        this.game.load.image('portal-in-border3',        'images/portal-border-3.png');
        this.game.load.image('portal-out',               'images/portal-out.png');

        this.game.load.image('Coffee-sprite',            'images/coffee.png');
        this.game.load.image('Lunch-sprite',             'images/lunch.png');

        this.game.load.image('CVE-sprite',               'images/cve.png');
        this.game.load.image('Labs-sprite',              'images/labs.png');
        this.game.load.image('Shellshock-sprite',        'images/shellshock.png');
        this.game.load.image('Documentation-sprite',     'images/documentation.png');
        this.game.load.image('Discussions-sprite',       'images/discussion.png');
        this.game.load.image('PCM-sprite',               'images/pcm.png');

        this.game.load.image('ContainerCatalog-sprite',  'images/square-red2.png');
        this.game.load.image('PackageSearch-sprite',     'images/square-blue3.png');
        this.game.load.image('square-blue3',             'images/square-blue3.png');
        this.game.load.image('square-blue1',             'images/square-blue1.png');

        this.game.load.shader('portal-perspective',      'shaders/portal-perspective.frag');

        this.game.data = {
            leap: new LeapController()
        };
    }

    create() {
        this.state.start('SplashState');
    }
}

