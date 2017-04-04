class PlayState extends Phaser.State {
    create() {
        console.log('[play] starting play state');
        this.score = 0;
        this.scoreMultiplier = 1;
        this.rnd = new Phaser.RandomDataGenerator();

        this.startTime();
        this.createScoreUI();
        this.createTimeUI();

        this.createSounds();
        this.createControlPosition();
        this.createPortalIn();
        this.createPortalOut();
        this.createBlockSpriteArray();
        this.createCapturedBlockSpriteArray();
        this.createChamberWalls();
        this.createWell();
        this.createSplash();
        this.createShellBurst();
        this.hidePortals();
        this.startDay();
    }

    update() {
        this.updatePlayTime();
        this.updateTimeUI();

        this.handleCollisions();
        // this.updatePortalSpin();
        this.updatePortalIn();
        this.updatePlayerLeapControls();
        this.updateVulnPositions();
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

    createSounds() {
        this.sounds = {
            Coffee           : this.game.add.audio('coffee'),
            Lunch            : this.game.add.audio('coffee'),
            CVE              : this.game.add.audio('cve'),
            PCM              : this.game.add.audio('pickup1'),
            ContainerCatalog : this.game.add.audio('pickup2'),
            PackageSearch    : this.game.add.audio('pickup3'),
            Documentation    : this.game.add.audio('pickup4'),
            Labs             : this.game.add.audio('pickup5'),
            Discussions      : this.game.add.audio('pickup6'),
            Shellshock       : this.game.add.audio('shellshock'),
            splash           : this.game.add.audio('splash', 0.1),
            static1          : this.game.add.audio('static1', 0.4),
            static2          : this.game.add.audio('static2', 0.4),
            static3          : this.game.add.audio('static3', 0.4),
            static4          : this.game.add.audio('static4', 0.4),
        };
    }

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
        // this.portalIn.scale.set(0.8, 0.3);
        this.portalIn.position.set(this.game.world.centerX, this.game.world.height - config.VIEWPORT_PADDING - this.portalIn.height / 2);
        this.portalSinkPosition = { x: 0, y: 0 }; // location captured blocks are tweened to
        this.portalIn.data.hasVuln = false;
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

    createShellBurst() {
        // burst viz
        this.burstEmitter = game.add.emitter(0, 0, 1000);
        this.burstEmitter.makeParticles('shrapnel', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29], 30, false, false);
        this.burstEmitter.gravity = 0;
        this.burstEmitter.minParticleSpeed.setTo(-600, -600);
        this.burstEmitter.maxParticleSpeed.setTo(600, 600);
        this.burstEmitter.area.width = 50;
        this.burstEmitter.area.height = 50;
    }

    /* update functions */

    updatePlayerLeapControls() {
        if (typeof this.game.data.leap.palmX === 'number') {
            const leapX = 1000*(this.game.data.leap.palmX + 280) / 300;
            this.controlPosition.set(leapX);
            this.showPortals();
        }
    }

    updatePlayerControls(pointer, x, y, isDown) {
        this.controlPosition.set(x, y);
        this.showPortals();
    }

    updatePortalIn() {
        // Update Position
        const dest = this.portalIn.position.clone();
        dest.multiply(1 - config.CONTROL_RESPONSIVENESS, 1);
        dest.add(this.controlPosition.x * config.CONTROL_RESPONSIVENESS, 0);
        this.portalIn.position.copyFrom(dest);

        // collide with walls
        this.portalIn.position.x = Math.max(config.SIDE_CHAMBER_WIDTH + this.portalIn.width/2 + this.leftWall.width, this.portalIn.position.x);
        this.portalIn.position.x = Math.min(this.game.world.width - config.SIDE_CHAMBER_WIDTH - this.portalIn.width/2, this.portalIn.position.x);

        this.portalSinkPosition.x = this.portalIn.position.x;
        this.portalSinkPosition.y = this.portalIn.position.y - this.portalIn.height / 4;

        // Animate vuln glitch
        if (this.portalIn.data.hasVuln) {
            if (this.portalIn.data.glitchFrames == 0) {
                this.setPortalGlitch(this.portalIn);

            }
            else {
                this.portalIn.data.glitchFrames--;
            }
            // console.log(this.portalIn.data.glitchFrames);
        }
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
                    block.rotation = this.game.physics.arcade.angleToXY(block, this.portalIn.position.x, this.portalIn.position.y);
                    block.rotation -= Math.PI / 2;
                    block.body.acceleration.copyFrom(accel);
                }
            }
        }
    }

    updatePlayTime() {
        this.updateTimestamp = new Date().getTime();
    }

    updateTimeUI() {
        this.timeText.setText(((this.updateTimestamp - this.startTimestamp) / 1000).toFixed(0));
    }

    /* misc functions */

    setPortalGlitch(portal) {
        // portal.tint = 0xff0000;  // Red tint
        const glitchNumber = this.game.rnd.between(1, 4);
        portal.data.glitchFrames = this.game.rnd.between(10, 40); // how many frames to keep this texture
        portal.loadTexture('portal-in_glitch_' + glitchNumber);
        this.sounds[`static${glitchNumber}`].play();
    }

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

            this.sounds.splash.play();

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
            portal.loadTexture('portal-in');
        }

        if (!block.data.captured && !portal.data.hasVuln && (portal.position.y > block.position.y)) {
            // If captured vuln, disable portal
            if (block.data.name == 'Shellshock') {
                console.log("[play] !!!!Captured VULN!!!!");
                portal.data.hasVuln = true;
                block.data.captured = true;
                block.destroy(true);
                this.burstEmitter.x = block.position.x;
                this.burstEmitter.y = block.position.y;

                this.burstEmitter.alpha = 1;
                this.burstEmitter.start(true, 1500, null, 30);
                this.game.camera.shake(0.02, 500);

                this.game.add
                    .tween(this.burstEmitter)
                    .to(
                        { alpha: 0 },
                        1500,
                        Phaser.Easing.Linear.None,
                        true
                    );

                this.setPortalGlitch(portal);
                this.sounds.Shellshock.play();
            }
            else {
                const relativePosition = new Phaser.Point(
                    block.position.x - portal.position.x,
                    block.position.y - portal.position.y
                );
                block.data.relativeCapturePosition = relativePosition;

                block.data.captured = true;

                block.data.texture = block.generateTexture();

                this.sounds[block.data.name].play();

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

        this.blocksFalling = true;

        // every so often, run the check to determine whether to drop a block
        this.game.time.events.loop(config.BLOCK_DROP_MIN_INTERVAL_MS, this.blockDropCheck, this);

        // schedule coffee and lunch
        this.game.time.events.add(config.COFFEE_DELAY_MS, () => this.blockAppear(this.day.getCoffee()), this);
        this.game.time.events.add(config.DAY_DURATION_MS / 2, () => this.blockAppear(this.day.getLunch()), this);

        // schedule some vulns
        const vulnTimespan = 0.9 * config.DAY_DURATION_MS;
        for (let i = 1; i < config.VULNS_PER_DAY + 1; ++i) {
            this.game.time.events.add(vulnTimespan * i / config.VULNS_PER_DAY, () => this.blockAppear(this.day.getVuln()), this);
            this.game.time.events.add(Phaser.Timer.SECOND + vulnTimespan * i / config.VULNS_PER_DAY, () => this.blockAppear(this.day.getCVE()), this);
        }

        // add game end timer
        this.game.time.events.add(config.DAY_DURATION_MS + config.END_DURATION_MS, this.gameEnd, this);
        this.game.time.events.add(config.DAY_DURATION_MS, this.stopDroppingBlocks, this);
    }

    blockDropCheck() {
        const progress = ( this.updateTimestamp - this.startTimestamp ) /  config.DAY_DURATION_MS;
        const p = config.BLOCK_DROP_PROBABILITY_FUNC(progress) * config.BLOCK_DROP_PROBABILITY_MAX;
        if (this.rnd.frac() < p) {
            const block = this.day.getRandomBlock();
            this.blockAppear(block);
        }
        // console.log(`[play] progress: ${progress}/${config.DAY_DURATION_MS}, ${p} chance of block`);
    }

    blockAppear(block) {
        if (!this.blocksFalling) return;

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

    stopDroppingBlocks() {
        this.blocksFalling = false;
    }

    gameEnd() {
        console.log('[play] game over');
        this.game.time.events.add(config.GAME_OVER_RESTART_DURATION_MS, this.gameRestart, this);
    }

    gameRestart() {
        console.log('[play] restarting');
        // this.game.state.start('SplashState');
        this.game.stateTransition.to('SplashState', true, false, { fromPlay: true });
    }

    showPortals() {
        this.portalIn.exists = true;
    }

    hidePortals() {
        this.portalIn.exists = false;
    }
}
