class Day {
    constructor() {
        this.rnd = new Phaser.RandomDataGenerator();
        this.dayBlocks = [];

        this.populateRandomBlocks();
        this.addVulns();
        this.addCoffee();
        this.addLunch();


    }

    populateRandomBlocks() {
        console.log(this.test);
        for (let i = 0; i < config.BLOCKS_PER_DAY; i++) {
            this.dayBlocks.push(Day.blockTypes[ this.rnd.between(0, Day.blockTypes.length - 1) ]);
        }
    }

    addVulns() {
        let nextVulnIndex = this.rnd.between(config.MIN_VULN_GAP, config.MAX_VULN_GAP);
        for (let i = 0; i < this.dayBlocks.length; i++) {
            if (i === nextVulnIndex) {
                console.log("adding vuln at index", i);
                this.dayBlocks.splice(i, 0, 'Shellshock');
                nextVulnIndex += this.rnd.between(config.MIN_VULN_GAP, config.MAX_VULN_GAP);
            }
        }
    }

    addCoffee() {
        this.dayBlocks.unshift('Coffee');
    }

    addLunch() {
        this.dayBlocks.splice(Math.ceil(this.dayBlocks.length/2), 0, 'Lunch');
    }
}

Day.blockTypes = [
    // 'PCM',
    // 'ContainerCatalog',
    'CVE',
    // 'Documentation',
    'Labs',
    // 'Discussions',
    // 'PackageSearch',
];
