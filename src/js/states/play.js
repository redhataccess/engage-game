class PlayState extends Phaser.State {
    create() {
        console.log('[play] starting play state');
        this.score = 0;
        this.scoreMultiplier = 1;

        this.createScoreUI();
        this.createTimeUI();

        this.createControlPosition();
        this.createPortalIn();
        this.createPortalInBorders();
        this.createPortalOut();
        this.createBlockSpriteArray();
        this.createCapturedBlockSpriteArray();
        this.createChamberWalls();
        this.createWell();
        this.createSplash();
        this.hidePortals();
        this.startDay();
        this.startTime();
    }

    update() {
        this.handleCollisions();
        // this.updatePortalSpin();
        this.updatePortalPosition();
        this.updatePlayerLeapControls();
        this.updateVulnPositions();
        this.updateTimeUI();
    }

    render() {
        // for (const block of this.capturedBlocks) {
        //     this.game.debug.body(block);
        // }
        // for (const block of this.blockSprites) {
        //     this.game.debug.body(block);
        // }
        // this.game.debug.body(this.portalIn);
    }

    shutdown() {
        const elapsedTime = new Date().getTime() - this.startTimestamp;
        console.log(`[play] day lasted ${(elapsedTime / 1000).toFixed(0)} seconds`);
    }

    /* create functions */

    createScoreUI() {
        let style = { font: "28px Monospace", fill: "#ffffff", align: "center" };
        this.scoreText = game.add.text(game.world.centerX, 4, "", style);
        this.scoreText.anchor.set(0.5, 0);
        this.scoreText.setText('Score: 0');
    }

    createTimeUI() {
        let style = { font: "28px Monospace", fill: "#ffffff", align: "center" };
        this.timeText = game.add.text(game.world.width - config.SIDE_CHAMBER_WIDTH - 48, 4, "", style);
        this.timeText.anchor.set(0, 0);
        this.timeText.setText('0s');
    }

    createPortalIn() {
        console.log('[play] creating portal-in');
        this.portalIn = this.game.add.sprite(0, 0, 'portal-in');
        this.game.physics.arcade.enableBody(this.portalIn);
        this.portalIn.anchor.set(0.5, 0.5);
        this.portalIn.scale.set(0.8, 0.3);
        this.portalIn.position.set(this.game.world.centerX, this.game.world.height - config.VIEWPORT_PADDING - this.portalIn.height / 2);
        this.portalSinkPosition = { x: 0, y: 0 }; // location captured blocks are tweened to
        this.portalIn.data.hasVuln = false;
        this.portalInBorder1Angle = 0;
        this.portalInBorder2Angle = 0;
    }

    createPortalInBorders() {
        // create spinning border 1
        this.portalInBorder1 = this.game.add.sprite(0, 0, 'portal-in-spin1');
        this.portalInBorder1.anchor.set(0.5, 0.5);
        this.portalInBorder1.angle = this.portalInBorder1Angle;
        this.portalInBorder1.scale.set(0.8, 0.3);
        this.portalInBorder1.position.set(this.game.world.centerX, this.game.world.height - config.VIEWPORT_PADDING - this.portalIn.height / 2);
        this.portalInBorder1.moveDown();
        // create spinning border 2
        this.portalInBorder2 = this.game.add.sprite(0, 0, 'portal-in-spin2');
        this.portalInBorder2.anchor.set(0.5, 0.5);
        this.portalInBorder2.angle = this.portalInBorder2Angle;
        this.portalInBorder2.scale.set(0.8, 0.3);
        this.portalInBorder2.position.set(this.game.world.centerX, this.game.world.height - config.VIEWPORT_PADDING - this.portalIn.height / 2);
        this.portalInBorder2.moveDown();
    }

    createPortalOut() {
        console.log('[play] creating portal-out');
        this.portalOut = this.game.add.sprite(0, 0, 'portal-out');
        this.portalOut.scale.set(0.6, 0.6);
        this.portalOut.sendToBack();
        // this.game.physics.arcade.enableBody(this.portalIn);
        // this.portalIn.body.immovable = true;
        // this.portalIn.anchor.set(0.5, 1.0);
        // this.portalIn.position.set(this.game.world.centerX, this.game.world.height - config.VIEWPORT_PADDING);
        // this.portalSinkPosition = { x: 0, y: 0 }; // location captured blocks are tweened to
        // this.portalIn.data.hasVuln = false;
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
        this.well.height = 28;
        this.well.width = config.SIDE_CHAMBER_WIDTH;
        this.well.anchor.set(0, 1);
        this.well.data.fill = 0.03; // how full the well is
        this.well.data.targetHeight = this.well.height; // how full the well is
        this.game.physics.arcade.enableBody(this.well);
        this.well.body.immovable = true;
        this.well.bringToTop();
    }

    createSplash() {
        // splash viz
        this.splashEmitter = game.add.emitter(0, 0, 400);
        this.splashEmitter.makeParticles('square-blue1');
        this.splashEmitter.gravity = config.BLOCK_GRAVITY;
        this.splashEmitter.width = 20;
        this.splashEmitter.minParticleScale = 0.10;
        this.splashEmitter.maxParticleScale = 0.10;
        // this.splashEmitter.minParticleSpeed = 10;
        // this.splashEmitter.maxParticleSpeed = 100;
        this.splashEmitter.setXSpeed(-30, 30);
        this.splashEmitter.setYSpeed(-100, -130);
    }

    /* update functions */

    updatePlayerLeapControls() {
        if (typeof this.game.data.leap.palmX === 'number') {
            const leapX = 1000*(this.game.data.leap.palmX + 280) / 300;
            console.log(`[play] leap X pos: ${leapX}`);
            this.controlPosition.set(leapX);
            this.showPortals();
        }
    }

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
        this.portalIn.position.x = Math.max(config.SIDE_CHAMBER_WIDTH + this.portalInBorder1.width/2 + this.leftWall.width, this.portalIn.position.x);
        this.portalIn.position.x = Math.min(this.game.world.width - config.SIDE_CHAMBER_WIDTH - this.portalInBorder1.width/2, this.portalIn.position.x);
        this.portalInBorder1.position.x = Math.max(config.SIDE_CHAMBER_WIDTH + this.portalIn.width/2 + this.leftWall.width, this.portalIn.position.x);
        this.portalInBorder1.position.x = Math.min(this.game.world.width - config.SIDE_CHAMBER_WIDTH - this.portalIn.width/2, this.portalIn.position.x);
        this.portalInBorder2.position.x = Math.max(config.SIDE_CHAMBER_WIDTH + this.portalIn.width/2 + this.leftWall.width, this.portalIn.position.x);
        this.portalInBorder2.position.x = Math.min(this.game.world.width - config.SIDE_CHAMBER_WIDTH - this.portalIn.width/2, this.portalIn.position.x);

        this.portalSinkPosition.x = this.portalIn.position.x;
        this.portalSinkPosition.y = this.portalIn.position.y - this.portalIn.height / 4;
    }

    updatePortalSpin() {
        this.portalInBorder1.destroy();
        this.portalInBorder2.destroy();

        this.portalInBorder1Angle += 1.01;
        this.portalInBorder2Angle -= 1.02;

        this.createPortalInBorders();
    }

    updateVulnPositions() {
        // make the vuln blocks track the portal position
        for (let i = 0, l = this.blockSprites.length; i < l; i++) {
            let block = this.blockSprites[i];
            if (!block.data.captured && block.data.name == 'Shellshock' && block.data.state === 'falling') {
                if (this.portalIn.position.y - block.position.y > 70) {
                    // block.position.x = UTIL.lerp(block.position.x, this.portalIn.position.x, 0.05);
                    const accel = Phaser.Point.subtract(this.portalIn.position, block.position);
                    accel.normalize();
                    accel.multiply(2000, 2000);
                    // block.body.rotation = 180 / Math.PI * this.game.physics.arcade.angleToXY(block, this.portalIn.position.x, this.portalIn.position.y);
                    // block.body.rotation -= Math.PI;
                    block.rotation = this.game.physics.arcade.angleToXY(block, this.portalIn.position.x, this.portalIn.position.y);
                    block.rotation -= Math.PI / 2;
                    block.body.acceleration.copyFrom(accel);
                }
            }
        }
    }

    updateTimeUI() {
        this.timeText.setText(((new Date().getTime() - this.startTimestamp) / 1000).toFixed(0));
    }

    /* misc functions */

    handleCollisions() {
        this.game.physics.arcade.collide(this.portalIn, this.blockSprites, null, this.blockOverlap, this);
        this.game.physics.arcade.collide(this.fallingVuln, [this.leftWall, this.rightWall]);
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
            block.body.velocity.set(0, config.BLOCK_VELOCITY_SINKING); // bob
            block.body.gravity.set(0, config.BLOCK_GRAVITY_SINKING); // sink

            // splash
            this.splashEmitter.x = block.position.x;
            this.splashEmitter.y = well.top;
            this.splashEmitter.start(true, 1300, null, 20);

            // remove the block from the game after it's had time to sink
            this.game.time.events.add(1000, () => block.destroy(true), this);
        }
        return false; // don't actually collide, we only want to detect overlap
    }

    blockOverlap(portal, block) {
        if (!block.data.captured && block.data.name == 'CVE' && portal.data.hasVuln) {
            console.log("[play] CVE Cleared VULN");
            portal.data.hasVuln = false;
            portal.tint = 0xffffff;
        }

        if (!block.data.captured && !portal.data.hasVuln && (portal.position.y > block.position.y)) {
            // If captured vuln, disable portal
            if (block.data.name == 'Shellshock') {
                console.log("[play] !!!!Captured VULN!!!!");
                portal.data.hasVuln = true;
                block.data.captured = true;
                portal.tint = 0xff0000
            }
            else {
                const relativePosition = new Phaser.Point(
                    block.position.x - portal.position.x,
                    block.position.y - portal.position.y
                );
                block.data.relativeCapturePosition = relativePosition;

                // if the block is overlapping the portal, make the object drift
                // towards the center of the portal
                block.data.captured = true;
                // block.body.angularVelocity = block.data.captureRotation * Math.sign(relativePosition);
                // block.body.velocity.y = 0;

                // const positionTween = this.game.add
                //     .tween(block.position)
                //     .to(
                //         this.portalSinkPosition,
                //         config.BLOCK_CAPTURE_DURATION_MS,
                //         Phaser.Easing.Linear.None,
                //         true
                //     );
                // positionTween.onComplete.add(() => this.blockCaptured(portal, block), this);

                // const sizeTween = this.game.add
                //     .tween(block.scale)
                //     .to(
                //         { x: 0, y: 0 },
                //         config.BLOCK_CAPTURE_DURATION_MS,
                //         Phaser.Easing.Linear.None,
                //         true
                //     );

                block.data.texture = block.generateTexture();

                const alphaTween = this.game.add
                    .tween(block)
                    .to(
                        { alpha: 0 },
                        200,
                        Phaser.Easing.Linear.None,
                        true
                    );
                alphaTween.onComplete.add(() => this.blockCaptured(portal, block), this);
            }
        }

        return false;
    }

    blockCaptured(portal, block) {
        this.emitCapturedBlock(block);

        let scoreValue = 100;

        if (block.data.name == 'Lunch') {
            console.log("[play] Lunch Boost!");
            this.scoreMultiplier = 2;
            this.game.time.events.add(config.LUNCH_BOOST_DURATION, () => this.scoreMultiplier = 1, this);
        }
        else if (block.data.bonus) {
            scoreValue = 1000;
        }

        this.score += scoreValue * this.scoreMultiplier;
        this.scoreText.setText('Score: ' + this.score);

        console.log(`[play] captured block: ${block.data.name}`);

        block.destroy(true);
    }

    emitCapturedBlock(inBlock) {
        const newBlock = this.game.add.sprite(0, 0, inBlock.data.texture);
        newBlock.scale.set(1/3, 1/3);
        newBlock.data.splashed = false;
        newBlock.sendToBack();
        newBlock.moveUp(); // move on top of exit portal
        newBlock.anchor.set(0.5, 0.5);
        this.game.physics.arcade.enableBody(newBlock);
        newBlock.position.set(this.rnd.between(40, config.SIDE_CHAMBER_WIDTH - 40), 40);
        newBlock.body.gravity.y = config.BLOCK_GRAVITY;
        newBlock.body.velocity.copyFrom(inBlock.body.velocity.clone());
        newBlock.body.drag.set(0, 0);
        newBlock.body.collideWorldBounds = true;
        newBlock.body.angularVelocity = inBlock.body.angularVelocity / 4;
        newBlock.body.angularDrag = 20;
        newBlock.body.bounce.set(0.6,0.1);
        newBlock.body.setSize(20, 20, 30, 50);
        this.capturedBlocks.push(newBlock);
    }

    startDay() {
        console.log('[play] starting the day; good morning!');
        this.day = new Day();
        this.createPlayerControls();

        let delay = 0;

        for (let block of this.day.dayBlocks) {
            this.game.time.events.add(block.timing + delay, () => this.blockAppear(block), this);
            delay += block.delay;
        }

        console.log(`[play] this day will last ${(delay + config.DAY_DURATION_MS).toFixed(2)} seconds`);

        // add game end timer
        this.game.time.events.add(config.DAY_DURATION_MS + delay, this.gameEnd, this);
    }

    blockAppear(block) {
        console.log(`[play] now falling: ${block.name}`);
        const blockSprite = this.game.add.sprite(0, 0, `${block.name}-sprite`);

        // attach a name to the block sprite
        blockSprite.data = block;
        blockSprite.data.state = 'appearing';

        if (blockSprite.data.bonus) {
            blockSprite.tint = 0xffff00;
            console.log(`[play] bonus ${blockSprite.data.name} block falling`)
        }

        // if this block gets caught by the portal, set up how much it should rotate
        // const randomness = config.BLOCK_CAPTURE_ROTATION * config.BLOCK_CAPTURE_ROTATION_RANDOMNESS;
        // block.data.captureRotation = config.BLOCK_CAPTURE_ROTATION + (Math.random() * randomness - randomness / 2 );

        this.blockSprites.push(blockSprite);
        this.game.physics.arcade.enableBody(blockSprite);

        blockSprite.anchor.set(0.5, 0.5);
        blockSprite.position.x = blockSprite.width*2 + config.SIDE_CHAMBER_WIDTH + (this.game.world.width - config.SIDE_CHAMBER_WIDTH*2 - blockSprite.width*4) * Math.random();
        blockSprite.position.y = Math.random() * 120 + 40;

        // set up and execute an entry animation

        const anim = Animations[block.name];

        let endRotation = anim.Appear.Rotation.End;
        if (block.name === 'Shellshock') {
            // end rotation is dynamic for vulns; we want it to point toward the player right away
            endRotation = this.game.physics.arcade.angleToXY(blockSprite, this.portalIn.position.x, this.portalIn.position.y);
        }

        blockSprite.alpha = 0;
        blockSprite.rotation = anim.Appear.Rotation.Start;
        blockSprite.scale.set(anim.Appear.Scale.Start, anim.Appear.Scale.Start);

        // blockSprite.rotation = this.game.physics.arcade.angleToXY(blockSprite, this.portalIn.position.x, this.portalIn.position.y);
        const entryTween = this.game.add
            .tween(blockSprite)
            .to(
                {
                    alpha: 1,
                    rotation: endRotation,
                },
                anim.Appear.Duration,
                Phaser.Easing.Linear.None,
                true
            );
        entryTween.onComplete.add(() => this.blockFall(blockSprite), this);

        const scaleTween = this.game.add
            .tween(blockSprite.scale)
            .to(
                {
                    x: anim.Appear.Scale.End,
                    y: anim.Appear.Scale.End,
                },
                anim.Appear.Duration,
                anim.Appear.Easing,
                true
            );
    }

    blockFall(block) {
        block.body.gravity.y = config.BLOCK_GRAVITY;
        block.data.state = 'falling';

        switch (block.data.name) {
            case 'Shellshock':
                // make vulns fall faster
                // block.body.velocity.y = config.BLOCK_SKYFALL_BASE_VELOCITY * 1.5;
                block.body.gravity.set(0, 0);
                block.body.velocity.set(0, 0);
                block.body.maxVelocity.set(400, 400);
                block.body.bounce.set(0.7, 0);
                this.fallingVuln = block; // a handy reference to the vuln currently falling
                break;
            default:
                block.body.velocity.y = 0; //config.BLOCK_SKYFALL_BASE_VELOCITY;
        }
    }

    startTime() {
        this.startTimestamp = new Date().getTime();
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
