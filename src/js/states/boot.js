class BootState extends Phaser.State {
    create() {
        console.log('[boot] booting');
        this.state.start('PreloadState');
    }
}
