class Day {
    constructor() {
        this.rnd = new Phaser.RandomDataGenerator();
        this.dayBlocks = [];

        this.populateRandomBlocks();
        this.addVulns();
        this.addCoffee();
        this.addLunch();

        this.calculateTimings();
    }

    addEvent({
        name='NamelessEvent',
        index=this.dayBlocks.length,
        timing=0,
        delay=0,
        bonus=false,
    } = {}) {
        // insert the event
        this.dayBlocks.splice(index, 0, { name, timing, index, bonus, delay });
    }

    populateRandomBlocks() {
        for (let i = 0; i < config.BLOCKS_PER_DAY; i++) {
            const name = Day.blockTypes[ this.rnd.between(0, Day.blockTypes.length - 1) ];
            if (i % 3 == 0) { //TODO: make this more random
                const bonus = true;
                this.addEvent({ name,  bonus});
            }
            else {
                this.addEvent({ name });
            }

        }
    }

    addVulns() {
        let nextVulnIndex = this.rnd.between(config.MIN_VULN_GAP, config.MAX_VULN_GAP);
        let nextCVE = nextVulnIndex + config.VULN_TO_CVE_BLOCKS;
        for (let index = 0; index < this.dayBlocks.length; index++) {
            if (index === nextVulnIndex) {
                console.log("adding vuln at index", index);
                this.addEvent({ name: 'Shellshock', index });
                nextVulnIndex += this.rnd.between(config.MIN_VULN_GAP, config.MAX_VULN_GAP);
            }

            if (index === nextCVE) {
                console.log("adding CVE at index", index);
                this.addEvent({ name: 'CVE', index });
                nextCVE = nextVulnIndex + config.VULN_TO_CVE_BLOCKS
            }
        }
    }

    addCoffee() {
        this.addEvent({ name: 'Coffee', index: 0, delay: 2000 });
    }

    addLunch() {
        this.addEvent({ name: 'Lunch', index: Math.ceil(this.dayBlocks.length/2) });
    }

    getTiming(i) {
        // https://www.desmos.com/calculator/u2fjoyupeb
        // const x0 = 0;
        // const y0 = 0;
        // const x1 = this.dayBlocks.length;
        // const y1 = config.DAY_DURATION_MS;
        // return y0 + (i - x0) * (y1 - y0) / (x1 - x0);
        const easingFactor = Phaser.Easing.Exponential.Out(i / (this.dayBlocks.length - 1));
        return easingFactor * config.DAY_DURATION_MS;
    }

    calculateTimings() {
        let delay = 0;
        this.dayBlocks.forEach((block, i) => {
            // scale down the delay the closer we get to the end, so as not to
            // go  over the DAY_DURATION_MS, so as not to make the game last
            // longer than DAY_DURATION_MS.
            const delayScale = 1 - i / (this.dayBlocks.length - 1);
            block.timing = block.timing || this.getTiming(i);
            block.timing += delay * delayScale;
            delay += block.delay;
        });
    }
}

Day.blockTypes = [
    'PCM',
    'ContainerCatalog',
    'Documentation',
    'Labs',
    'Discussions',
    'PackageSearch',
];
