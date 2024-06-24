const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

let databases = [];
let database;

function connectToDatabases() {
    try {
        for (let i = 1; i < 5; i++) {
            const connectionString = `${mongoString}Server${i}`;
            const connection = mongoose.createConnection(connectionString, {});
            databases.push({ server: `Server${i}`, connection, nextDbIndex: i%4+1});

            connection.on('error', (error) => {
                console.error(`Erro ao conectar ao banco de dados Server${i}:`, error);
            });
            connection.once('connected', () => {
                console.log(`Conectado ao banco de dados Server${i}. O próximo é o Server${i%4+1}`);
            });
        }
    } catch (error) {
        console.error('Erro ao conectar aos bancos de dados:', error);
    }
}

function testConnection(){
    const connectionString = `${mongoString}Server1`;
    const connection = mongoose.createConnection(connectionString, {});
    database = connection;
    connection.on('error', (error) => {
        console.error(`Erro ao conectar ao banco de dados Server1:`, error);
    });
    connection.once('connected', () => {
        console.log(`Conectado ao banco de dados Server1. O próximo é o Server1`);
    });
}

// connectToDatabases();
testConnection();

module.exports = { database };





connect 
disconnect
