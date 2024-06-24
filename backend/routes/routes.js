const { Character, Occupation } = require('../models/model.js');
const {mongoose} = require('mongoose');
const express = require('express');
const router = express.Router();
const { database } = require('../db');
const { getNextDatabase } = require('../sequencer');

router.get('/getAllCharacters', async (req, res) => {
    try {
        // const db = getNextDatabase(databases);
        const data = await Character.find().exec();
        return res.json(data);
    } catch (error) {
        console.error('Error retrieving characters:', error);
        return res.status(500).json({ message: error.message });
    }
});

router.get('/getOneCharacter', async (req, res) => {
    try {
        const data = await Character.aggregate([{ $match: { username: req.query.name } }]);
        return res.json(data[0]);
    } catch (error) {
        console.error('Error retrieving character:', error);
        return res.status(500).json({ message: error.message });
    }
});

router.get('/getAllOccupations', async (req, res) => {
    try {
        const db = getNextDatabase(databases);
        const data = await Occupation.find().exec();
        return res.json(data);
    } catch (error) {
        console.error('Error retrieving occupations:', error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;