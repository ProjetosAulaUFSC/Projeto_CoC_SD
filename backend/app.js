require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const cors = require('cors');

const routes = require('./routes/routes'); // Importa as rotas definidas
const mongoString = process.env.DATABASE_URL;
const port = process.env.PORT;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(routes);

// Conectar ao MongoDB
mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const database = mongoose.connection;
database.on('error', (error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
});
database.once('connected', () => {
    console.log('Conectado ao banco de dados');
});

// Criar e configurar o servidor WebSocket
const wss = new WebSocket.Server(
    {port: 8000},
    function () {console.log("WebSocker = 8000");}
);

let clients = [];

wss.on('connection', (ws) => {
    clients.push(ws);
    console.log('Novo cliente conectado. Total de clientes:', clients.length);

    ws.on('message', (message) => {
        console.log('Mensagem recebida:', message);

        // Broadcast da mensagem para todos os clientes conectados
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

app.listen(port, () => {console.log('Servidor iniciado na porta 3000');});