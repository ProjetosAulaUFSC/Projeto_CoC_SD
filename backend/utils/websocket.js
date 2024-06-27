const WebSocket = require('ws');
const { put_post_character, find_in_db, connect_db } = require('../utils/utils');

let clients = [];
let requestQueue = [];
let processing = false;

function initializeWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        clients.push(ws);
        console.log('Novo cliente conectado. Total de clientes:', clients.length);

        ws.on('message', async (message) => {
            console.log('Mensagem recebida:', message);

            const wsRequest = { req: JSON.parse(message), ws: ws };
            requestQueue.push(wsRequest);
            requestQueue.sort((a, b) => a.req.timestamp - b.req.timestamp);  // Ordena por timestamp
            if (!processing) {
                await processQueue();
            }
        });

        ws.on('close', () => {
            clients = clients.filter(client => client !== ws);
            console.log('Cliente desconectado. Total de clientes:', clients.length);
        });
    });

    console.log("WebSocket server running");
}

async function processQueue() {
    if (processing) return;
    processing = true;

    while (requestQueue.length > 0) {
        const currentRequest = requestQueue.shift();
        const { req, ws } = currentRequest;

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

            ws.send(JSON.stringify(response));
        } catch (error) {
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

module.exports = { initializeWebSocket };
