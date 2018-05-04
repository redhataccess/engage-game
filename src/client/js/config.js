const config = Object.freeze({

    // What triggers the game to launch
    //  Modes:
    //    'move'  this will launch if the mouse or leap detects input
    //    'badge' this will launch if a badge is scanned
    LAUNCH_MODE: 'badge',

    // Port of the node.js server running on the game client host used for launching the game
    LAUNCHER_PORT: 3000,

    // skip splash and intro states (for rapid development)
    SKIP_BEGINNING: false,

    // Treat user as always winning top score for testing
    ALWAYS_WINNER: false,

    // URL to parse leaderboard database
    PARSE_URL: 'http://localhost:1337/parse/classes/leaders',

    // URL to where engage-game-server is running
    ENGAGE_SERVER_URL: 'http://localhost:8000',

    // Max character length for name and email submissions
    MAX_INPUT_LENGTH: 30,

    // canvas resolution
    CANVAS_WIDTH: 1920,
    CANVAS_HEIGHT: 1080,

    // padding around the edge of the viewport
    VIEWPORT_PADDING: 20,

    // how long does it take to exit the splash screen (allowing animations to
    // finish before the game begins)
    SPLASH_TRANSITION_DURATION: 0.6 * Phaser.Timer.SECOND,

    // How long to wait on Victory screen before transitioning to the next screen, only applies while in LAUNCH_MODE='badge'
    VICTORY_TRANSITION_DURATION: 5 * Phaser.Timer.SECOND,

    // How long to display leaderboard screen before transitioning to the next screen
    LEADERBOARD_DURATION: 14 * Phaser.Timer.SECOND,

    // once input is detected, how long to wait before beginning the game
    INPUT_WAIT_MS: Phaser.Timer.SECOND * 0.5,

    // how long to wait after game begins before first event falls from sky
    COFFEE_DELAY_MS: 1 * Phaser.Timer.SECOND,

    // how long the "day" lasts
    DAY_DURATION_MS: 60 * Phaser.Timer.SECOND,

    // how long to wait after the last block falls before ending the game
    END_DURATION_MS: 3 * Phaser.Timer.SECOND,

    // how long to wait after game over before restarting
    GAME_OVER_RESTART_DURATION_MS: 1.6 * Phaser.Timer.SECOND,

    // vulns per day
    VULNS_PER_DAY: 11,

    // delay the falling of the first vuln this long
    FIRST_VULN_DELAY: 6.0 * Phaser.Timer.SECOND,

    // how long after a vuln should a CVE fall
    CVE_DELAY: 3.0 * Phaser.Timer.SECOND,

    // how fast blocks are attracted when search bonus is active
    ATTRACTION_POWER: 20,

    // How long does the search attraction last ms
    SEARCH_BONUS_DURATION: 5 * Phaser.Timer.SECOND,
    SEARCH_BLOCK_DROP_CHANCE: 4,

    // How often does the 2x multiplier block drop
    X2_PER_DAY: 5,

    // how long vuln explosion animation should last
    VULN_EXPLODE_DURATION_MS: 1.5 * Phaser.Timer.SECOND,

    VULN_CAM_SHAKE_AMOUNT: 0.02,
    VULN_CAM_SHAKE_DURATION_MS: 0.5 * Phaser.Timer.SECOND,

    // how many frames to show each glitch sprite
    VULN_GLITCH_FRAMES_MIN: 8,
    VULN_GLITCH_FRAMES_MAX: 25,

    // Vuln difficulty.  Tune these to make shellshocks easier to avoid
    VULN_ACCEL: 1200,
    VULN_TRACKING: 0.016,
    VULN_MAX_TRACKING_SPEED: 400,
    VULN_SHELLSHOCK_SPEED: 600, // how fast the Shellshock vulns move

    // gravity applied to falling blocks
    BLOCK_GRAVITY: 350,

    // Score value of a regular block
    BLOCK_SCORE_VALUE: 5000,

    // Score value of bonus blocks
    BLOCK_BONUS_SCORE_VALUE: 10000,

    // How much so to scale the well row height based on score
    WELL_ROW_HEIGHT_SCORE_DIVISOR: 50000,

    // minimum interval between dropping blocks
    BLOCK_DROP_MIN_INTERVAL_MS: 0.1 * Phaser.Timer.SECOND,

    // how quickly should block drops ramp up?  any easing function can be used
    BLOCK_DROP_PROBABILITY_FUNC: Phaser.Easing.Quartic.Out,

    // the max probability of a block falling each tick
    BLOCK_DROP_PROBABILITY_MAX: 0.25,

    // how likely any random block is to be a bonus block
    BONUS_BLOCK_PROBABILITY: 0.06,

    // velocity and gravity applied to blocks once they fall into the well of knowledge
    BLOCK_VELOCITY_SINKING: 30,
    // BLOCK_GRAVITY_SINKING: 60,

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

    // How long the score multiplier bonus will last
    X2_BOOST_DURATION: 5 * Phaser.Timer.SECOND,

    // Play music or not
    PLAY_MUSIC: true,

    // how long does a player have to move to confirm that they accept the T&Cs
    TERMS_CONFIRMED_TIME: 2 * Phaser.Timer.SECOND,

});
