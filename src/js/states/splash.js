class SplashState extends Phaser.State {
    create() {
        console.log('[splash] showing splash screen');

        const title = this.game.add.sprite(0, 0, 'title');

        title.position.set(
            this.game.world.width / 2 - title.width / 2,
            this.game.world.height / 2 - title.height / 2
        );

        this.waitForInput();
    }

    next() {
        this.state.start('PlayState');
    }

    waitForInput() {
        console.log('[play] waiting for input');
        this.game.input.addMoveCallback(this.inputReceived, this);
    }

    inputReceived() {
        console.log('[play] input received');
        this.game.input.deleteMoveCallback(this.inputReceived, this);
        this.game.time.events.add(config.INPUT_WAIT_MS, this.endWaitForInput, this);
    }

    endWaitForInput() {
        console.log('[play] wait over');
        this.next();
    }


}

