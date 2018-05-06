class VictoryState extends Phaser.State {

    init({ score, isNewTopScore, isScoreOnLeaderboard }) {
        this.score = score;
        this.isNewTopScore = isNewTopScore;
        this.isScoreOnLeaderboard = isScoreOnLeaderboard;
        this.moving = false;  // boolean to see if the mouse or hand is moving
        this.timeMoving = 0;
        this.game.data.player.score = this.score;

        this.textTweenDelay = 250;  // now long to fade out and in text
    }

    create() {
        console.log('[victory] starting victory state');

        let style = {
            font: "65px Arial",
            fill: "#00ABCF",
            align: "center",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            wordWrap: true,
            wordWrapWidth: 900
        };

        let victoryMsg = `Congratulations ${this.game.data.player.Firstname}
You scored ${numeral(this.score).format('0,0')} points!
${this.isNewTopScore ? 'NEW TOP SCORE!' : ''}
`;

        // console.log('[victory] canvas width height: ', this.game.scale.width, this.game.scale.height, window.innerWidth, window.innerHeight);

        if (this.isScoreOnLeaderboard) {
            console.log('[victory] this score is on the leaderboard, they need to confirm terms');

            // Start terms acknowledgement movement tracking movement
            this.game.input.addMoveCallback(this.inputReceived, this);
            this.game.data.leap.addMoveCallback(this.inputReceived, this);

            let tcMsg = 'Wave your hand to accept the terms, get on the leaderboard, and be entered into the contest.';

            victoryMsg += tcMsg;

            this.text = this.game.add.text(0, 0, victoryMsg, style);
            this.text.setTextBounds(0, 0, this.game.scale.width, this.game.scale.height);

            this.createTermsTracking();
        }
        else {
            console.log('[victory] They are not on leaderboard just transition back to splash');

            this.text = this.game.add.text(0, 0, victoryMsg, style);
            this.text.setTextBounds(0, 0, this.game.scale.width, this.game.scale.height);

            // They are not on the leaderboard so no need to do terms acceptance just transition after a short delay
            this.game.time.events.add(config.VICTORY_TRANSITION_DURATION, this.next, this);

            // Send the score to the server for printing and storing in the leaderboard
            this.reportScore(this.game.data.player);
        }
    }

    update() {
    }

    shutdown() {
    }

    next() {
        this.game.stateTransition.to('SplashState', true, false, { fromPlay: true });
    }

    createTermsTracking() {
        this.moveTrackingInterval = setInterval(() => {
            if (this.moving) {
                this.timeMoving += 200;
                this.moving = false;

                if (this.timeMoving >= config.TERMS_CONFIRMED_TIME) {
                    console.log('[victory] terms and conditions acknowledged by player');

                    // Cleanup callbacks
                    this.game.input.deleteMoveCallback(this.inputReceived, this);
                    this.game.data.leap.deleteMoveCallback(this.inputReceived, this);

                    // Stop timer
                    clearInterval(this.moveTrackingInterval);

                    // Change text to confirmation message
                    let tween1 = this.game.add.tween(this.text).to({alpha: 0}, this.textTweenDelay, Phaser.Easing.Linear.None, false);
                    tween1.onComplete.add(() => {this.text.setText('Got it!')});
                    let tween2 = this.game.add.tween(this.text).to({alpha: 1}, this.textTweenDelay, Phaser.Easing.Linear.None, false);

                    tween1.chain(tween2);
                    tween1.start();

                    // Since they accepted the terms we can add them to the leaderboard now. yay!
                    this.reportScore(this.game.data.player);
                }
            }
            else {
                this.timeMoving = 0; // reset the moving timer
            }
        }, 200);
    }

    reportScore(player) {
        console.log('[victory] reporting score to server');

        let jsonPayload = '{}';

        try {
            jsonPayload = JSON.stringify(player);
        }
        catch(e) {
            console.error("Exception stringifying json for player object", e);
        }

        fetch(
            config.ENGAGE_SERVER_URL + '/playerScore',
            {
                method: 'POST',
                body: jsonPayload,
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
            }
        ).then(response => {
            console.log("[victory] API /playerScore status: ", response.status);
            response.text().then(text => console.log("[play] sendMessage response:", text));

            // Hide text so it doesn't overlap the leaderboard on state transition
            let tween = this.game.add.tween(this.text).to({alpha: 0}, this.textTweenDelay, Phaser.Easing.Linear.None, true);

            // now that the score is saved transition to leaderboard on splash screen
            // since th score is save the next time the leaderboard shows it will animate
            tween.onComplete.add(() => {this.next()});
        });
    }


    inputReceived() {
        this.moving = true;
    }
}