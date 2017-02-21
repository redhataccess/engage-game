class PlayState extends Phaser.State {
    create() {
        console.log('[play] starting play state');
        this.createControlPosition();
        this.createPortalIn();
        this.createBlockSpriteArray();
        this.hidePortals();
        this.startDay();
    }

    update() {
        this.handleCollisions();
        this.updatePortalPosition();
    }

    /* create functions */

    createPortalIn() {
        console.log('[play] creating portal-in');
        this.portalIn = this.game.add.sprite(0, 0, 'portal-in');
        this.game.physics.arcade.enableBody(this.portalIn);
        this.portalIn.body.immovable = true;
        this.portalIn.anchor.set(0.5, 1.0);
        this.portalIn.position.set(this.game.world.centerX, this.game.world.height - config.VIEWPORT_PADDING);
        this.portalPosition = { x: 0, y: 0 }; // for tweening
    }

    createPlayerControls() {
        console.log('[play] creating player controls');
        this.game.input.addMoveCallback(this.updatePlayerControls, this);
        this.game.input.addMoveCallback(this.showPortals, this);
    }

    createBlockSpriteArray() {
        this.blockSprites = [];
    }

    createControlPosition() {
        this.controlPosition = new Phaser.Point();
    }

    /* update functions */

    updatePlayerControls(pointer, x, y, isDown) {
        this.controlPosition.set(x, y);
        this.showPortals();
    }

    updatePortalPosition() {
        const dest = this.portalIn.position.clone();
        dest.multiply(1 - config.CONTROL_RESPONSIVENESS, 1);
        dest.add(this.controlPosition.x * config.CONTROL_RESPONSIVENESS, 0);
        this.portalIn.position.copyFrom(dest);

        this.portalPosition.x = this.portalIn.position.x;
        this.portalPosition.y = this.portalIn.position.y;
    }

    /* misc functions */

    handleCollisions() {
        this.game.physics.arcade.collide(this.portalIn, this.blockSprites, null, this.blockOverlap, this);
    }

    blockOverlap(portal, block) {
        if (!block.data.captured) {
            const relativePosition = block.position.x - portal.position.x;
            // if the block is overlapping the portal, make the object drift
            // towards the center of the portal
            block.data.captured = true;
            block.body.angularVelocity = block.data.captureRotation * Math.sign(relativePosition);
            block.body.velocity.y = 0; // cut velocity in half once captured

            const positionTween = this.game.add
                .tween(block.position)
                .to(
                    this.portalPosition,
                    config.BLOCK_CAPTURE_DURATION_MS,
                    Phaser.Easing.Linear.None,
                    true
                )
            positionTween.onComplete.add(() => this.blockCaptured(portal, block), this);

            const sizeTween = this.game.add
                .tween(block.scale)
                .to(
                    { x: 0, y: 0 },
                    config.BLOCK_CAPTURE_DURATION_MS,
                    Phaser.Easing.Linear.None,
                    true
                );

            return true;
        }
        else {
            return false;
        }
    }

    blockCaptured(portal, block) {
        block.position.set(this.game.world.centerX, this.game.world.centerY);
        block.scale.set(1, 1);
        console.log(`[play] captured block: ${block.data.blockName}`);
    }

    startDay() {
        console.log('[play] starting the day; good morning!');
        this.day = new Day();
        console.log(`[play] today\'s blocks: ${this.day.dayBlocks}`);
        this.createPlayerControls();

        const randomRange = config.BLOCK_INTERVAL_MS * config.BLOCK_INTERVAL_RANDOMNESS;
        let timer = config.COFFEE_DELAY_MS;

        for (let block of this.day.dayBlocks) {
            this.game.time.events.add(timer, () => this.blockSkyfall(block), this);
            const randomAdjustment = Math.random() * randomRange - randomRange / 2;
            timer += config.BLOCK_INTERVAL_MS + randomAdjustment;
        }

        // add game end timer
        this.game.time.events.add(timer, this.gameEnd, this);
    }

    blockSkyfall(block) {
        console.log(`[play] now falling: ${block}`);
        const blockSprite = this.game.add.sprite(0, 0, 'square-teal');

        // attach a name to the block sprite
        blockSprite.data.blockName = block;

        // if this blockSprite gets caught by the portal, set up how much it should rotate
        const randomness = config.BLOCK_CAPTURE_ROTATION * config.BLOCK_CAPTURE_ROTATION_RANDOMNESS;
        blockSprite.data.captureRotation = config.BLOCK_CAPTURE_ROTATION + (Math.random() * randomness - randomness / 2 );

        blockSprite.anchor.set(Math.random(), 1);
        this.blockSprites.push(blockSprite);
        this.game.physics.arcade.enableBody(blockSprite);
        blockSprite.body.velocity.y = config.BLOCK_SKYFALL_BASE_VELOCITY;
        blockSprite.position.x = this.game.world.width * Math.random();
    }

    gameEnd() {
        console.log('[play] game over');
        this.game.time.events.add(config.GAME_OVER_RESTART_DURATION_MS, this.gameRestart, this);
    }

    gameRestart() {
        console.log('[play] restarting');
        this.game.state.start('SplashState');
    }

    showPortals() {
        this.portalIn.exists = true;
    }

    hidePortals() {
        this.portalIn.exists = false;
    }
}
