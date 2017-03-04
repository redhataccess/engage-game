class LeapController {
    constructor() {
        Leap.loop({
            frame: frame => {
                // data.leapFrame = frame;
                try {
                    this.lastPalmX = this.palmX;
                    this.palmX = frame.hands[0].stabilizedPalmPosition[0];
                } catch (e) {
                    this.lastPalmX = this.palmX;
                    this.palmX = undefined;
                }
            },
        });
    }
}
