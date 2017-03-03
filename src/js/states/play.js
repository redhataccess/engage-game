class PlayState extends Phaser.State {
    create() {
        console.log('[play] starting play state');
        this.createControlPosition();
        this.createPortalIn();
        this.createBlockSpriteArray();
        this.createCapturedBlockSpriteArray();
        this.createChamberWalls();
        this.createWell();
        this.createSplash();
        this.hidePortals();
        this.startDay();
    }

    update() {
        this.handleCollisions();
        this.updatePortalPosition();
        this.updateVulnPositions();
    }

    render() {
        // for (const block of this.capturedBlocks) {
        //     this.game.debug.body(block);
        // }
    }

    /* create functions */

    createPortalIn() {
        console.log('[play] creating portal-in');
        this.portalIn = this.game.add.sprite(0, 0, 'portal-in');
        this.game.physics.arcade.enableBody(this.portalIn);
        // this.portalIn.body.immovable = true;
        this.portalIn.anchor.set(0.5, 1.0);
        this.portalIn.scale.set(0.6, 0.6);
        this.portalIn.position.set(this.game.world.centerX, this.game.world.height - config.VIEWPORT_PADDING);
        this.portalSinkPosition = { x: 0, y: 0 }; // location captured blocks are tweened to
        this.portalIn.data.hasVuln = false;
    }

    createPlayerControls() {
        console.log('[play] creating player controls');
        this.game.input.addMoveCallback(this.updatePlayerControls, this);
        this.game.input.addMoveCallback(this.showPortals, this);
    }

    createBlockSpriteArray() {
        this.blockSprites = [];
    }

    createCapturedBlockSpriteArray() {
        this.capturedBlocks = [];
    }

    createControlPosition() {
        this.controlPosition = new Phaser.Point();
    }

    createChamberWalls() {
        // create left chamber wall
        this.leftWall = this.game.add.sprite(config.SIDE_CHAMBER_WIDTH, 0, 'square-blue3');
        this.leftWall.height = this.game.world.height;
        this.leftWall.width = 2;
        this.game.physics.arcade.enableBody(this.leftWall);
        this.leftWall.body.immovable = true;

        // create right chamber wall
        this.rightWall = this.game.add.sprite(this.game.world.width - config.SIDE_CHAMBER_WIDTH, 0, 'square-blue3');
        this.rightWall.height = this.game.world.height;
        this.rightWall.width = 2;
        this.game.physics.arcade.enableBody(this.rightWall);
        this.rightWall.body.immovable = true;
    }

    createWell() {
        this.well = this.game.add.sprite(0, this.game.world.height, 'square-blue1');
        this.well.height = 10;
        this.well.width = config.SIDE_CHAMBER_WIDTH;
        this.well.anchor.set(0, 1);
        this.well.data.fill = 0; // how full the well is
        this.well.data.targetHeight = this.well.height; // how full the well is
        this.game.physics.arcade.enableBody(this.well);
        this.well.body.immovable = true;
        this.well.bringToTop();
    }

    createSplash() {
        // splash viz
        this.splashEmitter = game.add.emitter(0, 0, 400);
        this.splashEmitter.makeParticles('square-blue1');
        this.splashEmitter.gravity = 200;
        this.splashEmitter.width = 20;
        this.splashEmitter.minParticleScale = 0.10;
        this.splashEmitter.maxParticleScale = 0.10;
        // this.splashEmitter.minParticleSpeed = 10;
        // this.splashEmitter.maxParticleSpeed = 100;
        this.splashEmitter.setXSpeed(-30, 30);
        this.splashEmitter.setYSpeed(-80, -120);
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

        // collide with walls
        this.portalIn.position.x = Math.max(config.SIDE_CHAMBER_WIDTH + this.portalIn.width/2 + this.leftWall.width, this.portalIn.position.x);
        this.portalIn.position.x = Math.min(this.game.world.width - config.SIDE_CHAMBER_WIDTH - this.portalIn.width/2, this.portalIn.position.x);

        this.portalSinkPosition.x = this.portalIn.position.x;
        this.portalSinkPosition.y = this.portalIn.position.y - this.portalIn.height / 4;
    }

    updateVulnPositions() {
        // make the vuln blocks track the portal position
        for (let i = 0, l = this.blockSprites.length; i < l; i++) {
            let block = this.blockSprites[i];
            if (!block.data.captured && block.data.blockName == 'Shellshock') {
                if (this.portalIn.position.y - block.position.y > 80) {
                    block.position.x = UTIL.lerp(block.position.x, this.portalIn.position.x, 0.05);
                    block.rotation = this.game.physics.arcade.angleToXY(block, this.portalIn.position.x, this.portalIn.position.y);
                    block.rotation -= Math.PI / 2;
                }
            }
        }
    }

    /* misc functions */

    handleCollisions() {
        this.game.physics.arcade.collide(this.portalIn, this.blockSprites, null, this.blockOverlap, this);
        this.game.physics.arcade.collide(this.leftWall, this.capturedBlocks);
        this.game.physics.arcade.collide(this.portalIn, [this.leftWall, this.rightWall]);
        this.game.physics.arcade.collide(this.well, this.capturedBlocks, null, this.blockSplash, this);
        // this.game.physics.arcade.collide(this.capturedBlocks, this.capturedBlocks);
    }

    blockSplash(well, block) {
        if (!block.data.splashed) {
            block.data.splashed = true;

            // update height of well sprite
            well.data.fill += config.WELL_FILL_PER_BLOCK;
            this.game.add.tween(well)
                .to(
                    { height: this.game.world.height * well.data.fill },
                    config.WELL_FILL_DURATION_MS,
                    Phaser.Easing.Linear.None,
                    true
                );

            // make block bob and sink
            block.body.velocity.set(0, 30); // bob
            block.body.gravity.set(0, 60); // sink

            // splash
            this.splashEmitter.x = block.position.x;
            this.splashEmitter.y = well.top;
            this.splashEmitter.start(true, 1300, null, 14);
        }
        return false; // don't actually collide, we only want to detect overlap
    }

    blockOverlap(portal, block) {
        if (!block.data.captured && block.data.blockName == 'CVE' && portal.data.hasVuln) {
            console.log("[play] CVE Cleared VULN");
            portal.data.hasVuln = false;
            portal.tint = 0xffffff;
        }

        if (!block.data.captured && !portal.data.hasVuln) {
            // If captured vuln, disable portal
            if (block.data.blockName == 'Shellshock') {
                console.log("[play] !!!!Captured VULN!!!!");
                portal.data.hasVuln = true;
                block.data.captured = true;
                portal.tint = 0xff0000
            }
            else {
                const relativePosition = block.position.x - portal.position.x;
                // if the block is overlapping the portal, make the object drift
                // towards the center of the portal
                block.data.captured = true;
                block.body.angularVelocity = block.data.captureRotation * Math.sign(relativePosition);
                block.body.velocity.y = 0; // cut velocity in half once captured

                const positionTween = this.game.add
                    .tween(block.position)
                    .to(
                        this.portalSinkPosition,
                        config.BLOCK_CAPTURE_DURATION_MS,
                        Phaser.Easing.Linear.None,
                        true
                    );
                positionTween.onComplete.add(() => this.blockCaptured(portal, block), this);

                const sizeTween = this.game.add
                    .tween(block.scale)
                    .to(
                        { x: 0, y: 0 },
                        config.BLOCK_CAPTURE_DURATION_MS,
                        Phaser.Easing.Linear.None,
                        true
                    );
            }
        }

        return false;
    }

    blockCaptured(portal, block) {
        // const newBlock = block.clone();
        // newBlock.position.set(40, 40);
        // this.game.add.existing(newBlock);

        this.emitCapturedBlock(block);

        block.position.set(this.game.world.centerX, this.game.world.centerY);
        block.scale.set(1, 1);
        console.log(`[play] captured block: ${block.data.blockName}`);
    }

    emitCapturedBlock(inBlock) {
        const newBlock = this.game.add.sprite(0, 0, inBlock.generateTexture());
        newBlock.scale.set(1/3 * config.SPRITE_SCALE, 1/3 * config.SPRITE_SCALE);
        newBlock.data.splashed = false;
        newBlock.sendToBack();
        newBlock.anchor.set(0.5, 0.5);
        this.game.physics.arcade.enableBody(newBlock);
        newBlock.position.set(this.rnd.between(40, config.SIDE_CHAMBER_WIDTH - 40), 40);
        newBlock.body.gravity.y = 200;
        newBlock.body.drag.set(0, 0);
        newBlock.body.collideWorldBounds = true;
        newBlock.body.angularVelocity = inBlock.body.angularVelocity / 4;
        newBlock.body.angularDrag = 20;
        newBlock.body.bounce.set(0.6,0.1);
        newBlock.body.setSize(200, 200, 300, 500);
        this.capturedBlocks.push(newBlock);
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
        const blockSprite = this.game.add.sprite(0, 0, `${block}-sprite`);

        blockSprite.scale.set(config.SPRITE_SCALE, config.SPRITE_SCALE);

        // attach a name to the block sprite
        blockSprite.data.blockName = block;

        // if this blockSprite gets caught by the portal, set up how much it should rotate
        const randomness = config.BLOCK_CAPTURE_ROTATION * config.BLOCK_CAPTURE_ROTATION_RANDOMNESS;
        blockSprite.data.captureRotation = config.BLOCK_CAPTURE_ROTATION + (Math.random() * randomness - randomness / 2 );

        blockSprite.anchor.set(Math.random(), 1);
        this.blockSprites.push(blockSprite);
        this.game.physics.arcade.enableBody(blockSprite);
        blockSprite.body.velocity.y = config.BLOCK_SKYFALL_BASE_VELOCITY;

        if (block == 'Shellshock') {
            // make vulns fall faster
            blockSprite.body.velocity.y = config.BLOCK_SKYFALL_BASE_VELOCITY * 1.5;
        }

        blockSprite.position.x = blockSprite.width*2 + config.SIDE_CHAMBER_WIDTH + (this.game.world.width - config.SIDE_CHAMBER_WIDTH*2 - blockSprite.width*4) * Math.random();
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
