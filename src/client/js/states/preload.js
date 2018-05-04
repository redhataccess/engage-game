class PreloadState extends Phaser.State {
    preload() {
        console.log('[preload] preloading assets');

        // images

        this.game.load.image('portal-in',                'images/portal-in.png');
        this.game.load.image('portal-in_glitch_1',       'images/portal-in_glitch_1.png');
        this.game.load.image('portal-in_glitch_2',       'images/portal-in_glitch_2.png');
        this.game.load.image('portal-in_glitch_3',       'images/portal-in_glitch_3.png');
        this.game.load.image('portal-in_glitch_4',       'images/portal-in_glitch_4.png');

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

        // https://beepbox.co/#6n31s7k9l00e0jt7m0a7g0jjfi0r1o3310T0w1f1d1c0h0v5T0w3f1d0c1h1v1T0w8f1d1c0h6v1T2w1d1v1b0000128o00048y5ao8xycgE0y68N254chMy68oxy28oyAagEN20coNy4wUNz68i47e0p29gFxR1gdd5ldld5l4zjhjjnlnhnnnnhnhlhjhEGHGEGEHGGEGGEFFGHHHHEGFEAaWaWaqd5tBl5l5tll5ll5ddltttt5ld5Bt5t3j31CKjnplhlhpllhllhjjlnnnnhljhpnhcl5R6y2wqqaGqGqaGaWqaqqWGWaWWWWaWaGaqd5ltl5l5tll5ll5ddltttt5ld4xnhnhjhEHIGEGEHGGEGGEFFGHHHHEGFEIHE609HkOUahFCCfkz9Rklllklllklllq0Mgldb01OwR1OHjs74HKO6IeTB1G3BsEdgsHa3k5m3bIG-m6IeTB1G3PvkO0QOrZcC-qRcI2GaCBwj8Vd5l5jgM9kMM8SGsyz9FEV6NAV6PhjhFj71UzgJDoSI1FOdHr07td-wTSy205Wy20BjlAPBllp4VldmheljlOpOGGICsGGH8DaFGO9OGqGgAIx9F82wrlePmQ3qFSGSwrdeRmQ3pYPfdi5mnennlAnBRRV5VttuJi10X8OcD9Ocz9Osz8OsD8OejAX5sjNn4Yhn4YlAX5peRNf4lNfyMR1F3i6Ad8qgQxWzmjBnCVAU5CrApCVKperCrApAx00
        this.game.load.audio('song'       , 'sounds/hatching-a-plan.wav');

        // https://beepbox.co/#6n31s7k9l00e00t7m0a5g00j7i0r1o3200T0w8f5d1c2h1v0T0w1f1d1c2h0v0T0w1f1d1c3h4v0T2w4d1v2b4h4p1b0bfD8SNw000
        this.game.load.audio('coffee'     , 'sounds/coffee.wav');

        // https://beepbox.co/#6n11s7k9l00e00tam0a2g00j7i0r1o30T0w1f1d1c0h0v5T2w4d1v0b4gp1a0bg3S8g200
        this.game.load.audio('search'     , 'sounds/search.wav');

        // https://beepbox.co/#6n31s7k9l00e00t7m0a5g00j7i0r1o3200T0w8f5d1c2h1v0T0w1f1d1c0h0v0T0w1f1d1c3h4v0T2w4d1v2b4h4p1gFyk1ca4Qi3200000
        this.game.load.audio('cve'        , 'sounds/cve.wav');

        // https://beepbox.co/#6n31s7k9l00e00tem0a5g00j7i0r1o3200T0w8f5d1c0h1v0T0w1f1d1c0h0v0T0w1f1d1c3h4v0T2w4d1v2b4h4p1eGsu0yzpB000000
        this.game.load.audio('pickup-d'   , 'sounds/pickup-d.wav');

        // https://beepbox.co/#6n32s7k9l00e00tem0a5g00j7i0r1o32000T0w1f1d1c0h0v0T0w1f1d1c0h0v0T0w1f1d1c3h4v0T2w4d1v2T2w1d1v0b4h4gp1l002PqOa0kSIU1kxJi02U0
        this.game.load.audio('shellshock' , 'sounds/shellshock.wav');

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

