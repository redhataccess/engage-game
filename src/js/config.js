const config = Object.freeze({

    // padding around the edge of the viewport
    VIEWPORT_PADDING: 20,

    // how long to show the splash screen
    SPLASH_DURATION: Phaser.Timer.SECOND * 0.4,

    // once input is detected, how long to wait before beginning the game
    INPUT_WAIT_MS: Phaser.Timer.SECOND * 0.5,

    // how many random parts of the Portal will fall from the sky each day
    PORTAL_PARTS_PER_DAY: 500,

    // how long to wait after game begins before first event falls from sky
    COFFEE_DELAY_MS: 200,

    // how long to wait between events falling from sky
    EVENT_INTERVAL_MS: 200,

    // what fraction of EVENT_INTERVAL_MS should vary randomly
    EVENT_INTERVAL_RANDOMNESS: 0.2,

    EVENT_SKYFALL_BASE_VELOCITY: 400,

    // how quickly should events rotate when caught in the portal (degres)
    EVENT_CAPTURE_ROTATION: 360,

    // how much randomness should be applied to the rotation
    EVENT_CAPTURE_ROTATION_RANDOMNESS: 0.9,

    // how quickly should the event drift into the center of the portal
    EVENT_CAPTURE_DURATION_MS: 1337,

    // how quickly to move the player's portal to where the controls are
    // (lerped)
    CONTROL_RESPONSIVENESS: 0.6,

});
