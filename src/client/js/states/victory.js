class VictoryState extends Phaser.State {

    init({ score, isNewTopScore, isScoreOnLeaderboard }) {
        this.score = score;
        this.isNewTopScore = isNewTopScore;
        this.isScoreOnLeaderboard = isScoreOnLeaderboard;
        this.moving = false;  // boolean to see if the mouse or hand is moving
        this.timeMoving = 0;
        this.game.data.player.score = this.score;
    }

    create() {
        console.log('[victory] starting victory state');

        // Display Welcome message
        //TODO: Center this text
        let style = { font: "65px Arial", fill: "#00ABCF", align: "center" };
        let msg = this.game.add.text(game.world.centerX, game.world.centerY, "Congratulations " + this.game.data.player.Firstname + "!", style);
        msg.anchor.set(0.5);
        let scoreLabel = this.game.add.text(game.world.centerX, game.world.centerY + 70, "Score", style);
        scoreLabel.anchor.set(0.5);
        let scoreValue = this.game.add.text(game.world.centerX, game.world.centerY + 140, "" + this.score, style);
        scoreValue.anchor.set(0.5);

        if (this.isScoreOnLeaderboard) {
            console.log('[victory] this score is on the leaderboard, they need to confirm terms');

            // Start terms acknowledgement movement tracking movement
            this.game.input.addMoveCallback(this.inputReceived, this);
            this.game.data.leap.addMoveCallback(this.inputReceived, this);

            let tocText = this.game.add.text(game.world.centerX, game.world.centerY + 210, "Wave your hand to accept the terms and conditions of the contest", style);
            scoreValue.anchor.set(0.5);

            this.createTermsTracking();
        }
        else {
            console.log('[victory] They are not on leaderboard just transition back to splash');

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

            // now that the score is saved transition to leaderboard on splash screen
            // since th score is save the next time the leaderboard shows it will animate
            this.next();
        });
    }


    inputReceived() {
        this.moving = true;
    }
}