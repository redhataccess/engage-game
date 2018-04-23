class SplashState extends Phaser.State {

    init({ fromPlay=false }={}) {
        this.fromPlay = fromPlay; // coming from the play state?
    }

    create() {
        console.log('[splash] showing splash screen');

        if (config.SKIP_BEGINNING) {
            this.next();
            return;
        }

        if (this.fromPlay) {
            this.game.time.events.add(2000, this.startSplash, this);
        }
        else {
            this.startSplash();
        }
    }

    next() {
        // this.state.start('PlayState');
        this.game.stateTransition.to('IntroState');
    }

    startSplash() {
        // putting everything here instead of in create() so that it can be
        // delayed when necessary.
        this.showLogo();
        this.drawCurtain();
        this.waitForInput();
    }

    showLogo() {
        document.querySelector('.splash').classList.remove('hidden');
    }

    hideLogo() {
        document.querySelector('.splash').classList.add('hidden');
    }

    drawCurtain() {
        // draw a black backdrop.  the only reason for this is so when we
        // transition out of the splash state, there is something to transition
        // out of.  without this "curtain", the next state appears immediately
        // instead of transitioning.
        var graphics = this.game.add.graphics(0, 0);
        graphics.beginFill(0x000000);
        graphics.drawRect(0, 0, this.game.world.width, this.game.world.height);
        graphics.endFill();
    }

    waitForInput() {
        console.log('[splash] waiting for input');

        if (config.LAUNCH_MODE === 'move') {
            // start game when mouse moves
            this.game.input.addMoveCallback(this.inputReceived, this);
            // start game when leap moves
            this.game.data.leap.addMoveCallback(this.inputReceived, this);
        }
        else if (config.LAUNCH_MODE === 'badge') {
            // start game if badge is scanned, which will be received as a websocket message
            this.game.data.socket.on('launch_game', this.badgeScanReceived.bind(this));
        }

    }

    badgeScanReceived(msg) {
        console.log('[splash] badge scan received', msg);

        this.hideLogo();

        // Display Welcome message
        let style = { font: "65px Arial", fill: "#00ABCF", align: "center" };
        let text = this.game.add.text(game.world.centerX, game.world.centerY, "Welcome " + msg.Firstname, style);
        text.anchor.set(0.5);

        // Save the players info from their badge, then start the game
        this.game.time.events.add(config.INPUT_WAIT_MS * 10, this.endWaitForInput, this);
    }

    inputReceived() {
        console.log('[splash] input received');

        // remove callback from mouse motion
        this.game.input.deleteMoveCallback(this.inputReceived, this);
        // remove callback from leap motion... motion
        this.game.data.leap.deleteMoveCallback(this.inputReceived, this);

        this.game.time.events.add(config.INPUT_WAIT_MS, this.endWaitForInput, this);
    }

    endWaitForInput() {
        console.log('[splash] wait over');
        this.hideLogo();
        this.game.time.events.add(config.SPLASH_TRANSITION_DURATION, this.next, this);
    }
}
