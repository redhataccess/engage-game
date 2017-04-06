class SplashState extends Phaser.State {

    init({ fromPlay=false }={}) {
        this.fromPlay = fromPlay; // coming from the play state?
    }

    create() {
        console.log('[splash] showing splash screen');

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
        console.log('[play] waiting for input');
        // start game when mouse moves
        this.game.input.addMoveCallback(this.inputReceived, this);
        // start game when leap moves
        this.game.data.leap.addMoveCallback(this.inputReceived, this);
    }

    inputReceived() {
        console.log('[play] input received');

        // remove callback from mouse motion
        this.game.input.deleteMoveCallback(this.inputReceived, this);
        // remove callback from leap motion... motion
        this.game.data.leap.deleteMoveCallback(this.inputReceived, this);

        this.game.time.events.add(config.INPUT_WAIT_MS, this.endWaitForInput, this);
    }

    endWaitForInput() {
        console.log('[play] wait over');
        this.hideLogo();
        this.game.time.events.add(config.SPLASH_TRANSITION_DURATION, this.next, this);
    }
}
