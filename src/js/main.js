console.log('[main] initializing');

window.addEventListener('load', () => {
    setTimeout(() => window.game = new Game(), 1000);
});
