class SplashState extends Phaser.State {

    init({ fromPlay=false }={}) {
        this.fromPlay = fromPlay; // coming from the play state?
        console.log('[splash] init fromPlay: ', this.fromPlay);
    }

    create() {
        console.log('[splash] showing splash screen');

        if (config.SKIP_BEGINNING) {
            this.next();
            return;
        }
        this.changeSound = this.game.add.audio('splash-change', 0.2);

        this.badgeScanReceived = this.badgeScanReceived.bind(this);

        this.toggleLoop = this.game.time.events.loop(config.LEADERBOARD_DURATION, this.toggleLeaderboard, this);

        this.startSplash();
    }

    shutdown() {
        this.toggleLoop.pendingDelete = true;
    }

    toggleLeaderboard() {
        if (this.showing === 'splash') {
            console.log('toggling to leaderboard');
            this.showLeaderboard();
        }
        else if (this.showing === 'leaderboard') {
            console.log('toggling to splash');
            this.showSplash();
        }
        this.changeSound.play();
    }

    next() {
        // this.state.start('PlayState');
        console.log('splash.next()');
        this.game.stateTransition.to('IntroState');
    }

    startSplash() {
        // putting everything here instead of in create() so that it can be
        // delayed when necessary.
        if (this.fromPlay) {
            this.showLeaderboard();
        }
        else {
            this.showSplash();
        }
        this.waitForInput();
    }

    showSplash() {
        this.showing = 'splash';
        document.querySelector('.splash').classList.remove('hidden');
        this.hideLeaderboard();
    }

    hideSplash() {
        document.querySelector('.splash').classList.add('hidden');
    }

    showLeaderboard() {
        this.showing = 'leaderboard';
        document.querySelector('.leaderboard').classList.remove('hidden');
        this.hideSplash();

        // assuming the angular-powered leaderboard is ready, call this to update the leaderboard after a short wait
        if (window.updateLeaders) {
            this.game.time.events.add(1 * Phaser.Timer.SECOND, window.updateLeaders);
        }
    }

    hideLeaderboard() {
        document.querySelector('.leaderboard').classList.add('hidden');
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
            this.game.data.socket.on('launch_game', this.badgeScanReceived);
        }

    }

    badgeScanReceived(badge) {

        console.log('[splash] badge scan received', badge);

        // don't accept another badge scan (until we arrive at this state again, later)
        this.game.data.socket.off('launch_game', this.badgeScanReceived);

        this.hideSplash();
        this.hideLeaderboard();
        this.toggleLoop.pendingDelete = true;

        // Save the badge data to the database
        this.logBadge(badge);

        // Display Welcome message
        let style = { font: "65px Arial", fill: "#00ABCF", align: "center" };
        let text = this.game.add.text(game.world.centerX, game.world.centerY, "Welcome " + badge.Firstname, style);
        text.anchor.set(0.5);

        // Save the players info from their badge, then start the game
        this.game.data.player = badge;
        this.game.time.events.add(config.WELCOME_DELAY, this.endWaitForInput, this);
    }

    inputReceived() {
        console.log('[splash] input received');
        this.toggleLoop.pendingDelete = true;

        // remove callback from mouse motion
        this.game.input.deleteMoveCallback(this.inputReceived, this);
        // remove callback from leap motion... motion
        this.game.data.leap.deleteMoveCallback(this.inputReceived, this);

        this.game.time.events.add(config.INPUT_WAIT_MS, this.endWaitForInput, this);
    }

    endWaitForInput() {
        console.log('[splash] wait over');
        this.hideSplash();
        this.hideLeaderboard();
        this.toggleLoop.pendingDelete = true;
        this.game.time.events.add(config.SPLASH_TRANSITION_DURATION, this.next, this);
    }

    logBadge(badge) {
        fetch(
            config.ENGAGE_SERVER_URL + '/logBadge',
            {
                method: 'POST',
                body: JSON.stringify(badge),
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
            }
        ).then(response => {
            console.log("[play] API /logBadge status: ", response.status);
            response.text().then(text => console.log("[play] API /logBadge response:", text));
        });
    }
}
