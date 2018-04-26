class VictoryState extends Phaser.State {

    init({ score }) {
        this.score = score;
    }

    create() {
        console.log('[victory] starting victory state');
        this.game.time.events.add(config.VICTORY_TRANSITION_DURATION, this.next, this);

        // Display Welcome message
        let style = { font: "65px Arial", fill: "#00ABCF", align: "center" };
        let msg = this.game.add.text(game.world.centerX, game.world.centerY, "Congratulations " + this.game.data.player.Firstname + "!", style);
        msg.anchor.set(0.5);
        let scoreLabel = this.game.add.text(game.world.centerX, game.world.centerY + 70, "Score", style);
        scoreLabel.anchor.set(0.5);
        let scoreValue = this.game.add.text(game.world.centerX, game.world.centerY + 130, "" + this.score, style);
        scoreValue.anchor.set(0.5);

        this.game.data.player.score = this.score;

        // Send the score to the server for printing and storing in the leaderboard
        this.reportScore(this.game.data.player);

    }

    update() {
    }

    shutdown() {
    }

    next() {
        // TODO: Next state should go to leaderboard when it is ready
        this.game.stateTransition.to('SplashState', true, false, { fromPlay: true });
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
        });
    }
}