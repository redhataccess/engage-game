class LeapController {
    constructor() {
        this.moveCallbacks = [];
        Leap.loop({
            frame: frame => {
                // data.leapFrame = frame;
                try {
                    this.lastPalmX = this.palmX;
                    this.palmX = frame.hands[0].stabilizedPalmPosition[0];
                    this.moveCallbacks.forEach(cb => cb(this));
                } catch (e) {
                    this.lastPalmX = this.palmX;
                    this.palmX = undefined;
                }
            },
        });
    }
    addMoveCallback(cb, context={}) {
        this.moveCallbacks.push(() => cb.call(context));
    }
    deleteMoveCallback(cb, context={}) {
        this.moveCallbacks.splice(this.moveCallbacks.indexOf(cb), 1);
    }
}
