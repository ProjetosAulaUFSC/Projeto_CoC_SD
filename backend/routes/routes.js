require('dotenv').config();
const { Character, Occupation } = require('../models/model.js');
const { databases } = require('../db.js');
const {mongoose} = require('mongoose');
const express = require('express');
const router = express.Router();

let currentDb = databases[3];

router.get('/getAllCharacters', async (req, res) => {
    try {
        await connect_db();
        const data = await Character.find();
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
        const data = await Character.aggregate([{ $match: { username: req.query.name } }]);
        return res.json(data[0]);
    } catch (error) {
        console.error('Error retrieving character:', error);
        return res.status(500).json({ message: error.message });
    }
});

router.get('/getAllOccupations', async (req, res) => {
    try {
        await connect_db();
        const data = await Occupation.find();
        return res.json(data);
    } catch (error) {
        console.error('Error retrieving occupations:', error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;

async function connect_db(){
    await mongoose.disconnect();
    const selectedDB = currentDb.nextServer;
    console.log(`Servidor atual é o Server${selectedDB.id}`);
    await mongoose.connect(selectedDB.uri);
    const database = mongoose.connection;
    database.on('error', () =>{connect_db()})
    database.once('connected', ()=>{console.log('Banco de Dados conectado');})
}