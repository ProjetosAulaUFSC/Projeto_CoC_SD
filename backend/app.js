require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const routes = require('./routes/routes');
const { initializeWebSocket } = require('./utils/websocket');

const port = parseInt(process.env.PORT);
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(routes);

// Cria o servidor HTTP
const server = http.createServer(app);

// Inicializa o WebSocket server
initializeWebSocket(server);

server.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
