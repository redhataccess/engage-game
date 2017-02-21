class BootState extends Phaser.State {
    create() {
        console.log('[boot] booting');
        this.state.start('PreloadState');

        // Phaser will automatically pause if the browser tab the game is in
        // loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;
    }
}
