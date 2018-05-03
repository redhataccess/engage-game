class PreloadState extends Phaser.State {
    preload() {
        console.log('[preload] preloading assets');

        // images

        this.game.load.image('portal-in',                'images/portal-in.png');
        this.game.load.image('portal-in_glitch_1',       'images/portal-in_glitch_1.png');
        this.game.load.image('portal-in_glitch_2',       'images/portal-in_glitch_2.png');
        this.game.load.image('portal-in_glitch_3',       'images/portal-in_glitch_3.png');
        this.game.load.image('portal-in_glitch_4',       'images/portal-in_glitch_4.png');
        this.game.load.image('portal-out',               'images/portal-out.png');

        this.game.load.image('bonus-glow',               'images/bonus-glow.png');
        this.game.load.image('bonus-glow-gray',               'images/gray/bonus-glow.png');
        this.game.load.image('bonus-rays',               'images/bonus-rays.png');
        this.game.load.image('bonus-rays-gray',               'images/gray/bonus-rays.png');
        this.game.load.image('x2-sprite',                'images/2x.png');
        this.game.load.image('x2-sprite-gray',                'images/gray/2x.png');

        this.game.load.image('Coffee-sprite',            'images/coffee.png');
        this.game.load.image('Lunch-sprite',             'images/lunch.png');

        this.game.load.image('CVE-sprite',               'images/cve.png');
        this.game.load.image('Labs-sprite',              'images/labs.png');
        this.game.load.image('Labs-sprite-gray',              'images/gray/labs.png');
        this.game.load.image('Documentation-sprite',     'images/documentation.png');
        this.game.load.image('Documentation-sprite-gray',     'images/gray/documentation.png');
        this.game.load.image('Discussions-sprite',       'images/discussion.png');
        this.game.load.image('Discussions-sprite-gray',       'images/gray/discussion.png');
        this.game.load.image('Downloads-sprite',       'images/downloads.png');
        this.game.load.image('Downloads-sprite-gray',       'images/gray/downloads.png');
        this.game.load.image('PCM-sprite',               'images/pcm.png');
        this.game.load.image('PCM-sprite-gray',               'images/gray/pcm.png');

        // vulns
        this.game.load.image('Shellshock-sprite'      , 'images/shellshock.png');
        this.game.load.image('Shellshock-sprite-gray' , 'images/gray/shellshock.png');
        this.game.load.image('Specter-sprite'         , 'images/specter.png');
        this.game.load.image('Specter-sprite-gray'    , 'images/gray/specter.png');
        this.game.load.image('Ghost-sprite'           , 'images/ghost.png');
        this.game.load.image('Ghost-sprite-gray'      , 'images/gray/ghost.png');
        this.game.load.image('Meltdown-sprite'        , 'images/meltdown.png');
        this.game.load.image('Meltdown-sprite-gray'   , 'images/gray/meltdown.png');

        this.game.load.image('ContainerCatalog-sprite',  'images/container-catalog.png');
        this.game.load.image('ContainerCatalog-sprite-gray',  'images/gray/container-catalog.png');
        this.game.load.image('Search-sprite',            'images/search.png');
        this.game.load.image('Search-sprite-gray',            'images/gray/search.png');

        this.game.load.image('Well-sprite',              'images/well.png');
        this.game.load.image('Well-row1-sprite',         'images/well-row-1.png');
        this.game.load.image('Well-row2-sprite',         'images/well-row-2.png');
        this.game.load.image('Well-row3-sprite',         'images/well-row-3.png');
        this.game.load.image('Well-row4-sprite',         'images/well-row-4.png');
        this.game.load.image('Well-row5-sprite',         'images/well-row-5.png');
        this.game.load.image('Well-row6-sprite',         'images/well-row-6.png');

        // Sprite sheets
        this.game.load.spritesheet('shrapnel', 'images/shellshock.png', 44, 44, 30);
        this.game.load.spritesheet('ghost-poof', 'images/ghost-poof.png', 44, 44, 30);

        // audio

        this.game.load.audio('song'       , 'sounds/hatching-a-plan.wav');
        this.game.load.audio('coffee'     , 'sounds/coffee.wav');
        this.game.load.audio('cve'        , 'sounds/cve.wav');
        this.game.load.audio('pickup-d'   , 'sounds/pickup-d.wav');
        this.game.load.audio('shellshock' , 'sounds/shellshock.wav');
        this.game.load.audio('splash'     , 'sounds/splash.wav');
        this.game.load.audio('static1'    , 'sounds/static1.wav');
        this.game.load.audio('static2'    , 'sounds/static2.wav');
        this.game.load.audio('static3'    , 'sounds/static3.wav');
        this.game.load.audio('static4'    , 'sounds/static4.wav');

        // shaders

        this.game.load.text('portal-frag' , 'shaders/portal.frag');

        this.game.data = {
            leap: new LeapController()
        };

        // Set up socket.io connection if in launch mode 'badge'
        if (config.LAUNCH_MODE === 'badge') {
            let socket = io("http://localhost:" + config.LAUNCHER_PORT);

            socket.on('connect', function () {
                console.log("WebSocket connection established and ready.");
            });

            socket.on('client_joined', function (msg) {
                console.log(msg);
            });

            socket.on('client_left', function (msg) {
                console.log(msg);
            });

            this.game.data.socket = socket;
        }
    }

    create() {
        this.state.start('SplashState');
    }
}

