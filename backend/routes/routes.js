require('dotenv').config();
const { Character, Occupation } = require('../models/model.js');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const baseUrl = process.env.DATABASE_URL;

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

router.get('/getAllCharacters', async (req, res) => {
    try {
        await connect_db();
        const data = await Character.find().exec();
        console.log(data);
        return res.json(data);
    } catch (error) {
        console.error('Error retrieving characters:', error);
        return res.status(500).json({ message: error.message });
    }
});

router.get('/getOneCharacter', async (req, res) => {
    try {
        await connect_db();
        const data = await Character.aggregate([{ $match: { username: req.query.name } }]).exec();
        return res.json(data[0]);
    } catch (error) {
        console.error('Error retrieving character:', error);
        return res.status(500).json({ message: error.message });
    }
});

router.get('/getAllOccupations', async (req, res) => {
    try {
        await connect_db();
        const data = await Occupation.find().exec();
        return res.json(data);
    } catch (error) {
        console.error('Error retrieving occupations:', error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;

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
