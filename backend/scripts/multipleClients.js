const WebSocket = require('ws');

// Função para criar um cliente WebSocket e enviar uma mensagem
function createClient(clientNumber) {
    const ws = new WebSocket('ws://localhost:3000');

    ws.on('open', () => {
        console.log(`Cliente ${clientNumber} conectado ao servidor WebSocket`);

        const message = JSON.stringify({
            type: 'post',
            operation: 'Post',
            entity: 'Character',
            timestamp: Date.now() + clientNumber * 300,  // Adiciona o timestamp com um delay por cliente
            data: {
                name: `Character${clientNumber}`,
                STR: 50 + clientNumber,
                CON: 70 + clientNumber,
                SIZ: 40 + clientNumber,
                DEX: 50 + clientNumber,
                APP: 70 + clientNumber,
                INT: 70 + clientNumber,
                POW: 60 + clientNumber,
                EDU: 70 + clientNumber,
                LUC: 40 + clientNumber,
                occupation: 'Taxi',
                HP: 10 + clientNumber,
                MAG: 12 + clientNumber,
                LUC_Temp: 40 + clientNumber,
                SAN_Temp: 50 + clientNumber
            }
        });
        ws.send(message);
        console.log(`Cliente ${clientNumber} enviou mensagem:`, message);
    });

    ws.on('message', (message) => {
        const data = JSON.parse(message.toString());
        console.log(`Mensagem recebida pelo Cliente ${clientNumber} do servidor:`, data);
    });

    ws.on('close', () => {
        console.log(`Conexão do Cliente ${clientNumber} com o servidor WebSocket fechada`);
    });

    ws.on('error', (error) => {
        console.error(`Erro na conexão do Cliente ${clientNumber} WebSocket:`, error);
    });
}

// Função para criar múltiplos clientes com delay
function createMultipleClients(numClients) {
    for (let i = 1; i <= numClients; i++) {
        setTimeout(() => {
            createClient(i);
        }, i * 500);  // Adiciona um delay de 500ms entre a criação de cada cliente
    }
}

// Criar 4 clientes
createMultipleClients(4);
