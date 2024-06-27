const WebSocket = require('ws');
const { put_post_character, find_in_db, connect_db } = require('../utils/utils');

let clients = [];
let requestQueue = [];
let processing = false;
let logs = [];  // Array para armazenar os logs
let processingQueue = [];
let historyQueue = [];

function initializeWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        const clientNumber = clients.length + 1;
        clients.push({ ws, clientNumber });
        console.log('Novo cliente conectado. Total de clientes:', clients.length);

        ws.on('message', async (message) => {
            console.log('Mensagem recebida do cliente:', clientNumber);

            const wsRequest = { req: JSON.parse(message), ws: ws, clientNumber };
            requestQueue.push(wsRequest);
            requestQueue.sort((a, b) => a.req.timestamp - b.req.timestamp);  // Ordena por timestamp

            // Log para fila de requisições ordenada
            const logEntry = {
                timestamp: Date.now(),
                type: wsRequest.req.type,
                clientNumber: clientNumber,
                queue: requestQueue.map(r => ({ timestamp: r.req.timestamp, client: r.clientNumber }))
            };
            logs.push(logEntry);
            console.log('Fila de requisições ordenada:', logEntry.queue);

            if (!processing) {
                await processQueue();
            }
        });

        ws.on('close', () => {
            clients = clients.filter(client => client.ws !== ws);
            console.log('Cliente desconectado. Total de clientes:', clients.length, 'Número do cliente:', clientNumber);
        });
    });

    console.log("WebSocket server running");
}

async function processQueue() {
    if (processing) return;
    processing = true;

    while (requestQueue.length > 0) {
        processingQueue.push(requestQueue[0]);
        console.log('Processando requisição:', { timestamp: requestQueue[0].req.timestamp, client: requestQueue[0].clientNumber });
        const currentRequest = requestQueue.shift();

        const { req, ws, clientNumber } = currentRequest;

        try {
            await connect_db();  // Garante que a conexão com o banco de dados está estabelecida
            let response;
            if (req.type === 'find') {
                response = await handleFindRequest(req);
            } else if (req.type === 'post' || req.type === 'put') {
                response = await handlePutPostRequest(req);
            } else {
                response = { status: 400, message: 'Invalid request type' };
            }

            console.log(`Enviando requisição para o backend: timestamp ${req.timestamp}, cliente ${clientNumber}`);
            ws.send(JSON.stringify(response));

            logs.push({
                timestamp: Date.now(),
                type: 'processed',
                clientNumber: clientNumber,
                queue: requestQueue.map(r => ({ timestamp: r.req.timestamp, client: r.clientNumber }))
            });
            historyQueue.unshift(currentRequest);
            console.log('Histórico das requisições:', historyQueue.map(r => ({ timestamp: r.req.timestamp, client: r.clientNumber })));
        } catch (error) {
            console.error('Erro ao processar requisição:', error);
            ws.send(JSON.stringify({ status: 500, message: error.message }));
        }
    }

    processing = false;
}

async function handleFindRequest(req) {
    const { entity, filter } = req;
    return new Promise((resolve, reject) => {
        const mockResponse = {
            status: (statusCode) => ({
                json: (data) => resolve({ status: statusCode, data }),
            }),
        };
        find_in_db(entity, filter, mockResponse).catch(reject);
    });
}

async function handlePutPostRequest(req) {
    const { operation, data } = req;
    return new Promise((resolve, reject) => {
        const mockResponse = {
            status: (statusCode) => ({
                json: (data) => resolve({ status: statusCode, data }),
            }),
        };
        put_post_character(operation, data, mockResponse).catch(reject);
    });
}

function getLogs() {
    return logs;
}

module.exports = { initializeWebSocket, getLogs };
