class IntroState extends Phaser.State {

    create() {
        console.log('[intro] showing intro');

        if (config.SKIP_BEGINNING) this.next();

        this.createIntroText();
        this.game.time.events.add(1000, this.playIntro, this);
        this.drawCurtain();

    }

    createIntroText() {
        // this text will be printed one character at a time, as if they were
        // being typed.
        // underscores will not be printed, but they cause a pause in the
        // "typing".
        this.introText = `
8:00 AM...____GOOD MORNING.
____
USE THE RED HAT CUSTOMER PORTAL
      TO KEEP YOUR SYSTEMS SAFE.

BUT FIRST... HAVE SOME COFFEE.`;
    }

    next() {
        this.game.stateTransition.to('PlayState');
    }

    playIntro() {
        this.scoreText = game.add.text(80, 80, "");
        this.scoreText.font = 'Overpass Mono';
        this.scoreText.fontSize = 68;
        this.scoreText.fill = '#ffffff';

        this.scoreTextIndex = 0;

        // kick off the intro animation
        // this.advanceIntro();
        this.game.time.events.loop(55, this.advanceIntro, this);
    }

    advanceIntro() {
        this.scoreTextIndex += 1;
        // don't tarry on whitespace
        while (this.introText[this.scoreTextIndex] === ' ') {
            this.scoreTextIndex += 1;
        }
        // convert underscores into spaces.  underscores can be used to force
        // tarrying
        if (this.introText[this.scoreTextIndex] === '_') {
            this.introText = this.introText.replace('_', ' ');;
        }
        const nextText = this.introText.slice(0, this.scoreTextIndex);
        this.scoreText.setText(nextText);

        // when we reach the end of the text, wait a moment then go to next
        // state
        if (this.scoreTextIndex === this.introText.length) {
            this.game.time.events.add(1000, this.next, this);
        }
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

}
