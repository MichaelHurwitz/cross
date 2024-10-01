// client/js/socket.js

let socket = null;

// Initialize socket connection with JWT authentication
export const initSocket = (token) => {
    socket = io('http://localhost:3000', {
        auth: { token }
    });

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('gameStarted', (data) => {
        console.log(data.message);
    });

    socket.on('moveMade', (move) => {
        console.log('Move received:', move);
        // Update UI with the move
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });
};

// Emit start game event
export const startGame = (gameId) => {
    socket.emit('startGame', { gameId });
};

// Emit make move event
export const makeMove = (gameId, position) => {
    socket.emit('makeMove', { gameId, position });
};
