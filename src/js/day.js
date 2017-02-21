class Day {
    constructor() {
        this.dayBlocks = [];
        this.portalParts = [
            'PCM',
            'ContainerCatalog',
            'CVE',
            'Documentation',
            'Labs',
            'Discussions',
            'PackageSearch',
        ];
        this.populatePortalParts();
        this.addVulns();
        this.addCoffee();
        this.addLunch();
    }

    populatePortalParts() {
        for (let i = 0; i < config.PORTAL_PARTS_PER_DAY; i++) {
            this.dayBlocks.push(this.portalParts[ Math.floor(Math.random() * (this.portalParts.length - 1)) ]);
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
