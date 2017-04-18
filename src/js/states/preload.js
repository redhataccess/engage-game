class PreloadState extends Phaser.State {
    preload() {
        console.log('[preload] preloading assets');

        // images

        this.game.load.image('title', 'images/title-draft.png');

        this.game.load.image('room',                     'images/room.png');

        this.game.load.image('portal-in',                'images/portal-in.png');
        this.game.load.image('portal-in_glitch_1',       'images/portal-in_glitch_1.png');
        this.game.load.image('portal-in_glitch_2',       'images/portal-in_glitch_2.png');
        this.game.load.image('portal-in_glitch_3',       'images/portal-in_glitch_3.png');
        this.game.load.image('portal-in_glitch_4',       'images/portal-in_glitch_4.png');
        this.game.load.image('portal-in-spin1',          'images/portal-in-spin1.png');
        this.game.load.image('portal-in-spin2',          'images/portal-in-spin2.png');
        this.game.load.image('portal-out',               'images/portal-out.png');

        this.game.load.image('bonus-glow',               'images/bonus-glow.png');
        this.game.load.image('bonus-rays',               'images/bonus-rays.png');

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
        this.game.load.image('square-red1',              'images/square-red1.png');

        // Sprite sheets
        this.game.load.spritesheet('shrapnel', 'images/shellshock.png', 44, 44, 30);

        // audio

        this.game.load.audio('coffee'     , 'sounds/coffee.wav');
        this.game.load.audio('cve'        , 'sounds/cve.wav');
        this.game.load.audio('pickup1'    , 'sounds/pickup1.wav');
        this.game.load.audio('pickup2'    , 'sounds/pickup2.wav');
        this.game.load.audio('pickup3'    , 'sounds/pickup3.wav');
        this.game.load.audio('pickup4'    , 'sounds/pickup4.wav');
        this.game.load.audio('pickup5'    , 'sounds/pickup5.wav');
        this.game.load.audio('pickup6'    , 'sounds/pickup6.wav');
        this.game.load.audio('shellshock' , 'sounds/shellshock.wav');
        this.game.load.audio('splash'     , 'sounds/splash.wav');
        this.game.load.audio('static1'    , 'sounds/static1.wav');
        this.game.load.audio('static2'    , 'sounds/static2.wav');
        this.game.load.audio('static3'    , 'sounds/static3.wav');
        this.game.load.audio('static4'    , 'sounds/static4.wav');

        this.game.data = {
            leap: new LeapController()
        };
    }

    create() {
        this.state.start('SplashState');
    }
}

