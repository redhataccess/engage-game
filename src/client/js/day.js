class Day {
    constructor() {
        this.rnd = new Phaser.RandomDataGenerator();
    }

    static get blockTypes() {
        return [
            'PCM',
            'ContainerCatalog',
            'Documentation',
            'Labs',
            // 'Discussions',
            'Downloads',
        ];
    }

    static get vulns() {
        return [
            'Shellshock',
            'Specter',
            'Ghost',
            'Meltdown',
        ];
    }

    getBlock({ name='NamelessEvent', timing=0, delay=0, bonus=false, vuln=false} = {}) {
        return { name, timing, bonus, delay, vuln };
    }

    getRandomBlock() {
        const name = Day.blockTypes[ this.rnd.between(0, Day.blockTypes.length - 1) ];
        const bonus = this.rnd.frac() < config.BONUS_BLOCK_PROBABILITY;
        return this.getBlock({ name,  bonus });
    }

    getVuln() {
        return this.getBlock({ vuln: true, name: _.sample(Day.vulns) });
    }

    getX2() {
        return this.getBlock({ name: 'x2' });
    }

    getCVE() {
        return this.getBlock({ name: 'CVE' });
    }

    getCoffee() {
        return this.getBlock({ name: 'Coffee', delay: 1000 });
    }

    getLunch() {
        return this.getBlock({ name: 'Lunch', delay: 1000 });
    }
}

