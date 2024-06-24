require('dotenv').config();

const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');

const routes = require('./routes');
const port = parseInt(process.env.PORT);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(routes);

const wss = new WebSocket.Server({ port: 8000 }, () => {
    console.log("WebSocket server running on port 8000");}
);

let clients = [];

wss.on('connection', (ws) => {
    clients.push(ws);
    console.log('Novo cliente conectado. Total de clientes:', clients.length);

    ws.on('message', (message) => {
        console.log('Mensagem recebida:', message);

        // Broadcast message to all connected clients
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
        console.log('Cliente desconectado. Total de clientes:', clients.length);
    });
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
