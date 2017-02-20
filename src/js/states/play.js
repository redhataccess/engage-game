class PlayState extends Phaser.State {
    create() {
        console.log('[play] starting play state');
        this.createPortalIn();
        this.hidePortals();
        this.startWaitForInput();
    }

    update() {
        this.updateFallingBlocks();
        this.updateTimeline();
    }

    /* create functions */

    createPortalIn() {
        console.log('[play] creating portal-in');
        this.portalIn = this.game.add.sprite(0, 0, 'portal-in');
    }

    createPlayerControls() {
        console.log('[play] creating player controls');
        this.game.input.addMoveCallback(this.updatePlayerControls, this);
        this.game.input.addMoveCallback(this.showPortals, this);
    }

    /* update functions */

    updatePlayerControls(pointer, x, y, isDown) {
        this.portalIn.position.set(
            x - this.portalIn.width / 2,
            this.game.world.height - this.portalIn.height - config.VIEWPORT_PADDING
        );
    }

    updateFallingBlocks() {
    }

    updateTimeline() {
    }

    /* misc functions */

    startWaitForInput() {
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
        this.startDay();
    }

    startDay() {
        console.log('[play] starting the day; good morning!');
        this.day = new Day();
        this.createPlayerControls();
        this.showPortals();
    }

    showPortals() {
        this.portalIn.visible = true;
    }

    hidePortals() {
        this.portalIn.visible = false;
    }
}
