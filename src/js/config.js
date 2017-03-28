const config = Object.freeze({

    // canvas resolution
    CANVAS_WIDTH: 1920,
    CANVAS_HEIGHT: 1080,

    // padding around the edge of the viewport
    VIEWPORT_PADDING: 20,

    // how long does it take to exit the splash screen (allowing animations to
    // finish before the game begins)
    SPLASH_TRANSITION_DURATION: 0.6 * Phaser.Timer.SECOND,

    // once input is detected, how long to wait before beginning the game
    INPUT_WAIT_MS: Phaser.Timer.SECOND * 0.5,

    // how long to wait after game begins before first event falls from sky
    COFFEE_DELAY_MS: 1000,

    // how long the "day" lasts
    DAY_DURATION_MS: 50 * Phaser.Timer.SECOND,

    // how long to wait after the last block falls before ending the game
    END_DURATION_MS: 3 * Phaser.Timer.SECOND,

    // vulns per day
    VULNS_PER_DAY: 3,

    // gravity applied to falling blocks
    BLOCK_GRAVITY: 300,

    // minimum interval between dropping blocks
    BLOCK_DROP_MIN_INTERVAL_MS: 100,

    // how quickly should block drops ramp up?  any easing function can be used
    BLOCK_DROP_PROBABILITY_FUNC: Phaser.Easing.Quadratic.InOut,

    // how likely any random block is to be a bonus block
    BONUS_BLOCK_PROBABILITY: 0.05,

    // velocity and gravity applied to blocks once they fall into the well of knowledge
    BLOCK_VELOCITY_SINKING: 30,
    BLOCK_GRAVITY_SINKING: 60,

    // how quickly to move the player's portal to where the controls are
    // (lerped)
    CONTROL_RESPONSIVENESS: 1.0,

    // how long to wait after game over before restarting
    GAME_OVER_RESTART_DURATION_MS: 7 * Phaser.Timer.SECOND,

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
