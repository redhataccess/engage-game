class PlayState extends Phaser.State {
    create() {
        console.log('[play] starting play state');
        this.createPortalIn();
        this.createEventSpriteArray();
        this.hidePortals();
        this.startWaitForInput();
    }

    update() {
        this.handleCollisions();
    }

    /* create functions */

    createPortalIn() {
        console.log('[play] creating portal-in');
        this.portalIn = this.game.add.sprite(0, 0, 'portal-in');
        this.game.physics.arcade.enableBody(this.portalIn);
        this.portalIn.body.immovable = true;
        this.portalIn.anchor.set(0.5, 1.0);
        this.portalIn.position.set(this.game.world.centerX, this.game.world.height);
    }

    createPlayerControls() {
        console.log('[play] creating player controls');
        this.game.input.addMoveCallback(this.updatePlayerControls, this);
        this.game.input.addMoveCallback(this.showPortals, this);
    }

    createEventSpriteArray() {
        this.eventSprites = [];
    }

    /* update functions */

    updatePlayerControls(pointer, x, y, isDown) {
        this.portalIn.position.set(x, this.game.world.height - config.VIEWPORT_PADDING);
        this.showPortals();
    }

    /* misc functions */

    handleCollisions() {
        this.game.physics.arcade.collide(this.portalIn, this.eventSprites, this.eventCaptured, this.eventOverlap, this);
    }

    eventOverlap(portal, event) {
        // const nearPortalCenter = 

        // if the event is overlapping the portal, make the object drift
        // towards the center of the portal
        event.angle += event.data.captureRotation;

        return false;
    }

    eventCaptured(portal, event) {
        console.log(`[play] captured event: ${event.data.eventName}`);
    }

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
        console.log(`[play] today\'s events: ${this.day.dayEvents}`);
        this.createPlayerControls();

        const randomRange = config.EVENT_INTERVAL_MS * config.EVENT_INTERVAL_RANDOMNESS;
        let timer = config.COFFEE_DELAY_MS;

        for (let event of this.day.dayEvents) {
            this.game.time.events.add(timer, () => this.eventSkyfall(event), this);
            const randomAdjustment = Math.random() * randomRange - randomRange / 2;
            timer += config.EVENT_INTERVAL_MS + randomAdjustment;
        }
    }

    eventSkyfall(event) {
        console.log(`[play] event ${event}`);
        const eventSprite = this.game.add.sprite(0, 0, 'square-teal');

        // attach a name to the event sprite
        eventSprite.data.eventName = event;

        // if this eventSprite gets caught by the portal, set up how much it should rotate
        const randomness = config.EVENT_CAPTURE_ROTATION * config.EVENT_CAPTURE_ROTATION_RANDOMNESS;
        eventSprite.data.captureRotation = config.EVENT_CAPTURE_ROTATION + (Math.random() * randomness - randomness / 2 );
        eventSprite.data.captureRotation *= Math.sign(Math.random() - 0.5);

        eventSprite.anchor.set(0.5, 0.5);
        this.eventSprites.push(eventSprite);
        this.game.physics.arcade.enableBody(eventSprite);
        eventSprite.body.velocity.y = config.EVENT_SKYFALL_BASE_VELOCITY;
        eventSprite.position.x = this.game.world.width * Math.random();
    }

    showPortals() {
        this.portalIn.visible = true;
    }

    hidePortals() {
        this.portalIn.visible = false;
    }
}
