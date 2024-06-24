const { Character, Occupation } = require('../models/model.js');
const express = require('express');
const router = express.Router();
const utils = require('../utils/utils.js');

router.get('/getAllCharacters', async (req, res) => {
    try {
        await utils.connect_db();
        const data = await Character.find().exec();
        return res.json(data);
    } catch (error) {
        console.error('Error retrieving characters:', error);
        return res.status(500).json({ message: error.message });
    }
});

router.get('/getOneCharacter', async (req, res) => {
    try {
        await utils.connect_db();
        const data = await Character.find({ name: req.body.name }).exec();
        return res.json(data);
    } catch (error) {
        console.error('Error retrieving character:', error);
        return res.status(500).json({ message: error.message });
    }
});

router.get('/getAllOccupations', async (req, res) => {
    try {
        await utils.connect_db();
        const data = await Occupation.find().exec();
        return res.json(data);
    } catch (error) {
        console.error('Error retrieving occupations:', error);
        return res.status(500).json({ message: error.message });
    }
});

router.get('/getOneOccupation', async (req, res) => {
    try {
        await utils.connect_db();
        const data = await Occupation.findOne({ name: req.body.name }).exec();
        return res.json(data);
    } catch (error) {
        console.error('Error retrieving occupation:', error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;