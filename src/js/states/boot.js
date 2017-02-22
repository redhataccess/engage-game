class BootState extends Phaser.State {
    create() {
        console.log('[boot] booting');
        this.state.start('PreloadState');

        // resize the canvas to fit the screen
        this.game.scale.maxWidth = config.CANVAS_WIDTH;
        this.game.scale.maxHeight = config.CANVAS_HEIGHT;
        this.updateCanvasSize();
        window.addEventListener('resize', this.updateCanvasSize.bind(this));

        // Phaser will automatically pause if the browser tab the game is in
        // loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;
    }

    updateCanvasSize() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.updateLayout();
        console.log(`[boot] resized canvas`);
    }
}
