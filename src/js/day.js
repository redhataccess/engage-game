class Day {
    constructor() {
        this.dayEvents = [];
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
            this.dayEvents.push(this.portalParts[ Math.floor(Math.random() * (this.portalParts.length - 1)) ]);
        }
    }

    addVulns() {
    }

    addCoffee() {
        this.dayEvents.unshift('Coffee');
    }

    addLunch() {
        this.dayEvents.splice(Math.ceil(this.dayEvents.length/2), 0, 'Lunch');
    }
}
