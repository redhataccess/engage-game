const config = Object.freeze({

    // canvas resolution
    CANVAS_WIDTH: 1920,
    CANVAS_HEIGHT: 1080,

    // padding around the edge of the viewport
    VIEWPORT_PADDING: 20,

    // how long to show the splash screen
    SPLASH_DURATION: Phaser.Timer.SECOND * 0.0,

    // once input is detected, how long to wait before beginning the game
    INPUT_WAIT_MS: Phaser.Timer.SECOND * 0.5,

    // how many random blocks will fall from the sky each day
    BLOCKS_PER_DAY: 100,

    // how long to wait after game begins before first event falls from sky
    COFFEE_DELAY_MS: 200,

    // how long to wait between events falling from sky
    BLOCK_INTERVAL_MS: 200,

    // what fraction of BLOCK_INTERVAL_MS should vary randomly
    BLOCK_INTERVAL_RANDOMNESS: 0.2,

    // base velocity of falling blocks
    BLOCK_SKYFALL_BASE_VELOCITY: 400,

    // how quickly should events rotate when caught in the portal (degres)
    BLOCK_CAPTURE_ROTATION: 360,

    // how much randomness should be applied to the rotation
    BLOCK_CAPTURE_ROTATION_RANDOMNESS: 0.9,

    // how quickly should the event drift into the center of the portal
    BLOCK_CAPTURE_DURATION_MS: 1337,

    // how quickly to move the player's portal to where the controls are
    // (lerped)
    CONTROL_RESPONSIVENESS: 0.6,

    // how long to wait after game over before restarting
    GAME_OVER_RESTART_DURATION_MS: 4 * Phaser.Timer.SECOND,

    // how wide the side chambers should be (Portal chamber on left and Legend
    // chamber on right)
    SIDE_CHAMBER_WIDTH: 250,

    // Min and max number of regular blocks between a vuln block
    MIN_VULN_GAP: 15,
    MAX_VULN_GAP: 30,

    // How much to scale down sprites (may need a better way to control scale...)
    SPRITE_SCALE: 0.1,

});
