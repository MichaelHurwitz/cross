// client/js/app.js

import { initSocket, startGame, makeMove } from './socket.js';

// Initialize the app on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('jwtToken');

    if (token) {
        initSocket(token);
    } else {
        // Handle login and registration
        handleLogin();
    }

    // Add event listeners to game buttons
    document.getElementById('startGameButton').addEventListener('click', () => {
        startGame('game-123');
    });

    document.getElementById('moveButton').addEventListener('click', () => {
        makeMove('game-123', { x: 1, y: 2 });
    });
});
