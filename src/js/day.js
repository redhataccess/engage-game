class Day {
    constructor() {
        this.dayEvents = [];
        this.portalParts = [
            'SupportCase',
            'Documentation',
            'LabsApp',
            'Downloads',
            'Insights',
        ];
        this.populatePortalParts();
        this.addVulns();
        this.startWithCoffee();
        this.addLunch();
    }

    populatePortalParts() {
        for (let i = 0; i < config.PORTAL_PARTS_PER_DAY; i++) {
            this.dayEvents.push(this.portalParts[ Math.floor(Math.random() * (this.portalParts.length - 1)) ]);
        }
    }

    addVulns() {
    }

    startWithCoffee() {
        this.dayEvents.unshift('Coffee');
    }

    addLunch() {
        this.dayEvents.splice(Math.ceil(this.dayEvents.length/2), 0, 'Lunch');
    }
}
