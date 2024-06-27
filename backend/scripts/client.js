const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

// Conexão estabelecida
ws.on('open', () => {
    console.log('Conectado ao servidor WebSocket');

    const message = JSON.stringify({
        type: 'post',
        operation: 'Post',
        entity: 'Character',
        timestamp: Date.now(),  // Adiciona o timestamp
        data: {
            name: 'Deboras',
            STR: 50,
            CON: 70,
            SIZ: 40,
            DEX: 50,
            APP: 70,
            INT: 70,
            POW: 60,
            EDU: 70,
            LUC: 40,
            occupation: 'Taxi',
            HP: 10,
            MAG: 12,
            LUC_Temp: 40,
            SAN_Temp: 50
        }
    });
    ws.send(message);
    console.log('Mensagem enviada:', message);
});

// Mensagem recebida do servidor
ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    console.log('Mensagem recebida do servidor:', data);
});

// Fechamento da conexão
ws.on('close', () => {
    console.log('Conexão com o servidor WebSocket fechada');
});

// Erro na conexão
ws.on('error', (error) => {
    console.error('Erro na conexão WebSocket:', error);
});
