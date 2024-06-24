require('dotenv').config();
const baseUrl = process.env.DATABASE_URL;
const mongoose = require('mongoose');

let databases = (() => {
    let dbArray = [];
    for (let i = 1; i <= 4; i++) {
        dbArray.push({
            id: i,
            uri: `${baseUrl}Server${i}`,
            nextServer: (i % 4),
            hasToken: false
        });
    }
    return dbArray;
})();

let currentDb = databases[0];

async function connect_db() {
    await mongoose.disconnect();

    console.log(`Connecting to Server${currentDb.id}@${currentDb.uri}`);
    await mongoose.connect(currentDb.uri);
    const database = mongoose.connection;
    currentDb = databases[currentDb.nextServer];
    
    database.on('error', (error) => {
        console.error('Connection error:', error);
        connect_db();
    });
    database.once('connected', () => {
        console.log(`Connected to Server${currentDb.id}`);
    });
}

module.exports = { connect_db };