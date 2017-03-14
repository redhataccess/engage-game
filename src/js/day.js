class Day {
    constructor() {
        this.rnd = new Phaser.RandomDataGenerator();
        this.dayBlocks = [];
        this.delay = 2000;

        this.populateRandomBlocks();
        this.addVulns();
        this.addCoffee();
        this.addLunch();
    }

    addEvent({
        name='NamelessEvent',
        delay=this.delay,
        index=this.dayBlocks.length,
        bonus=false,
    } = {}) {
        // make blocks fall faster over time
        this.delay = Math.max(150, this.delay - 50);

        // insert the event
        this.dayBlocks.splice(index, 0, { name, delay, index, bonus });
    }

    populateRandomBlocks() {
        console.log(this.test);
        for (let i = 0; i < config.BLOCKS_PER_DAY; i++) {
            const name = Day.blockTypes[ this.rnd.between(0, Day.blockTypes.length - 1) ];
            this.addEvent({ name });
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
        this.addEvent({ name: 'Coffee', index: 0 });
    }

    addLunch() {
        this.addEvent({ name: 'Lunch', index: Math.ceil(this.dayBlocks.length/2) });
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
