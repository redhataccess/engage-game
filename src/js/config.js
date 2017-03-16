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
    BLOCKS_PER_DAY: 200,

    // how long to wait after game begins before first event falls from sky
    COFFEE_DELAY_MS: 200,

    // how long the "day" lasts
    DAY_DURATION_MS: 60000,

    // how long to wait after the day ends before going back to title screen
    END_DURATION_MS: 5000,

    // what fraction of BLOCK_INTERVAL_MS should vary randomly
    BLOCK_INTERVAL_RANDOMNESS: 0.2,

    // gravity applied to falling blocks
    BLOCK_GRAVITY: 300,

    // velocity and gravity applied to blocks once they fall into the well of knowledge
    BLOCK_VELOCITY_SINKING: 30,
    BLOCK_GRAVITY_SINKING: 60,

    // how quickly should events rotate when caught in the portal (degres)
    BLOCK_CAPTURE_ROTATION: 360,

    // how much randomness should be applied to the rotation
    BLOCK_CAPTURE_ROTATION_RANDOMNESS: 0.9,

    // how quickly should the event drift into the center of the portal
    BLOCK_CAPTURE_DURATION_MS: 1337,

    // how quickly to move the player's portal to where the controls are
    // (lerped)
    CONTROL_RESPONSIVENESS: 1.0,

    // how long to wait after game over before restarting
    GAME_OVER_RESTART_DURATION_MS: 4 * Phaser.Timer.SECOND,

    // how wide the side chambers should be (Portal chamber on left and Legend
    // chamber on right)
    SIDE_CHAMBER_WIDTH: 250,

    // Min and max number of regular blocks between a vuln block
    MIN_VULN_GAP: 15,
    MAX_VULN_GAP: 30,

    // Number of blocks before next CVE drops
    VULN_TO_CVE_BLOCKS: 15,

    // How much to fill up the well with each splashdown, as percentage of game
    // height, from 0 to 1
    WELL_FILL_PER_BLOCK: 0.003,
    WELL_FILL_DURATION_MS: 100, // how long it takes to tween height after each splashdown

    // How long the lunch score multiplier bonus will last
    LUNCH_BOOST_DURATION: 7000,

});
