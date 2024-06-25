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

router.post('/createCharacter', async (req, res) => {   
    try {
        let newCharacter;
        for(let i = 0; i < utils.databases_size; i++){   
            await utils.connect_db();
            const { occupation, ...characterData } = req.body;
            const foundOccupation = await Occupation.findOne({ name: occupation }).exec();
            if (!foundOccupation) return res.status(404).json({ message: 'No occupation with this name found' });
            
            characterData.fid_occupation = foundOccupation._id;
            newCharacter = new Character(characterData);
            await newCharacter.save();
        }
        return res.json(newCharacter);
    } catch (error) {
        console.error('Error creating character:', error);
        return res.status(500).json({ message: error.message });
    }
});

router.put('/updateCharacter', async (req, res) => {
    try {
        await utils.connect_db();
        const data = await Character.findOneAndUpdate({ name: req.body.name }, req.body, { new: true }).exec();
        return res.json(data);
    } catch (error) {
        console.error('Error updating character:', error);
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

router.post('/createOccupation', async (req, res) => {
    try {
        await utils.connect_db();
        const existingOcuppation = await Occupation.findOne({ name: req.body.name }).exec();
        if(existingOcuppation) return res.status(409).json({ message: 'Occupation already exists' });
        const highestIdOccupation = await Occupation.findOne().sort({ id: -1 }).exec();
        const highestId = highestIdOccupation ? highestIdOccupation.id : 0;
        let newOccupationData = { id: highestId + 1, name: req.body.name };
        let newOccupation = new Occupation(newOccupationData);
        await newOccupation.save();
        for(let i=0; i<3;i++){
            await utils.connect_db();
            newOccupation = new Occupation(newOccupationData);
            await newOccupation.save();
        }
        return res.json(newOccupation);
    } catch (error) {
        console.error('Error creating occupation:', error);
        return res.status(500).json({ message: error.message });
    }
});

router.put('/updateOccupation', async (req, res) => {
    try {
        let data;
        for(let i=0; i<4;i++){
            await utils.connect_db();
            data = await Occupation.findOneAndUpdate({id: req.body.id}, {name: req.body.name}, {new: true}).exec();
        }
        return res.json(data);
    } catch (error) {
        console.error('Error updating occupation:', error);
        return res.status(500).json({ message: error.message });
    }
});

router.delete('/deleteOccupation', async (req, res) => {
    try {
        let data;
        for(let i = 0; i < utils.databases_size(); i++){
            await utils.connect_db();
            data = await Occupation.findOneAndDelete({ name: req.body.name }).exec();
        }
        return res.json(data);
    } catch (error) {
        console.error('Error deleting occupation:', error);
        return res.status(500).json({ message: error.message });
    }
});

router.delete('/deleteDB', async (req, res) => {await utils.kill();});
router.post('/createDB', async (req, res) => {await utils.create();});

module.exports = router;