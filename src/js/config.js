const config = Object.freeze({

    // skip splash and intro states (for rapid development)
    SKIP_BEGINNING: false,

    // URL to parse leaderboard database
    PARSE_URL: 'http://localhost:1337/parse/classes/leaders',

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
    COFFEE_DELAY_MS: 3 * Phaser.Timer.SECOND,

    // how long the "day" lasts
    DAY_DURATION_MS: 50 * Phaser.Timer.SECOND,

    // how long to wait after the last block falls before ending the game
    END_DURATION_MS: 3 * Phaser.Timer.SECOND,

    // how long to wait after game over before restarting
    GAME_OVER_RESTART_DURATION_MS: 7 * Phaser.Timer.SECOND,

    // vulns per day
    VULNS_PER_DAY: 5,

    // how long after a vuln should a CVE fall
    CVE_DELAY: 2.0 * Phaser.Timer.SECOND,

    // how fast blocks are attracted when surch bonus is active
    ATTRACTION_POWER: 20,

    // How long does the search attraction last ms
    SEARCH_BONUS_DURATION: 5000,

    // how long vuln explosion animation should last
    VULN_EXPLODE_DURATION_MS: 1.5 * Phaser.Timer.SECOND,

    VULN_CAM_SHAKE_AMOUNT: 0.02,
    VULN_CAM_SHAKE_DURATION_MS: 0.5 * Phaser.Timer.SECOND,

    // how many frames to show each glitch sprite
    VULN_GLITCH_FRAMES_MIN: 8,
    VULN_GLITCH_FRAMES_MAX: 25,



    // gravity applied to falling blocks
    BLOCK_GRAVITY: 300,

    // minimum interval between dropping blocks
    BLOCK_DROP_MIN_INTERVAL_MS: 0.1 * Phaser.Timer.SECOND,

    // how quickly should block drops ramp up?  any easing function can be used
    BLOCK_DROP_PROBABILITY_FUNC: Phaser.Easing.Quadratic.InOut,
    // the max probability of a block falling each tick
    BLOCK_DROP_PROBABILITY_MAX: 0.25,

    // how likely any random block is to be a bonus block
    BONUS_BLOCK_PROBABILITY: 0.05,

    // velocity and gravity applied to blocks once they fall into the well of knowledge
    BLOCK_VELOCITY_SINKING: 50,
    BLOCK_GRAVITY_SINKING: 60,

    // how quickly to move the player's portal to where the controls are
    // (lerped)
    CONTROL_RESPONSIVENESS: 1.0,

    // how wide the side chambers should be (Portal chamber on left and Legend
    // chamber on right)
    SIDE_CHAMBER_WIDTH: 250,

    // How much to fill up the well with each splashdown, as percentage of game
    // height, from 0 to 1
    WELL_FILL_PER_BLOCK: 0.003,
    WELL_FILL_DURATION_MS: 0.1 * Phaser.Timer.SECOND, // how long it takes to tween height after each splashdown

    // How long the lunch score multiplier bonus will last
    LUNCH_BOOST_DURATION: 7 * Phaser.Timer.SECOND,

});
