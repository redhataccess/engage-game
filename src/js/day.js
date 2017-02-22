class Day {
    constructor() {
        this.dayBlocks = [];
        this.populateRandomBlocks();
        this.addVulns();
        this.addCoffee();
        this.addLunch();
    }

    populateRandomBlocks() {
        for (let i = 0; i < config.BLOCKS_PER_DAY; i++) {
            this.dayBlocks.push(Day.blockTypes[ Math.floor(Math.random() * (Day.blockTypes.length - 1)) ]);
        }
    }

    addVulns() {
    }

    addCoffee() {
        this.dayBlocks.unshift('Coffee');
    }

    addLunch() {
        this.dayBlocks.splice(Math.ceil(this.dayBlocks.length/2), 0, 'Lunch');
    }
}

Day.blockTypes = [
    'PCM',
    'ContainerCatalog',
    'CVE',
    'Documentation',
    'Labs',
    'Discussions',
    'PackageSearch',
];
