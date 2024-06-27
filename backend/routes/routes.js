const { Character, Occupation } = require('../models/model.js');
const express = require('express');
const router = express.Router();
const utils = require('../utils/utils.js');

router.get('/getAllCharacters', async (req, res) => {
    return await utils.find_in_db("Character", {}, res);
});
//testado
router.get('/getOneCharacter', async (req, res) => {
    return await utils.find_in_db("Character", {name: req.body.name}, res);
});
//testado
router.post('/createCharacter', async (req, res) => {   
    return utils.put_post_character("Post", req.body, res);
});
//testado
router.put('/updateCharacter', async (req, res) => {
    return utils.put_post_character("Put", req.body, res);
});
//testado
router.delete('/deleteCharacter', async (req, res)=>{
    try{
        utils.pause();
        await utils.connect_db();
        const exists = await Character.findOne({name: req.body.name});
        if(!exists) return res.status(404).json({message: "This character doesn't exist"});
        const data = await utils.replicate("Character", "Delete", req.body);
        return res.status(200).json(data);
    } catch (error){
        console.log('Erro deleting character: ', error);
        return res.status(500).json({ message: error.message });
    }
});

//testado
router.get('/getAllOccupations', async (req, res) => {
    return await utils.find_in_db("Occupation", {}, res);
});
//testado
router.get('/getOneOccupation', async (req, res) => {
    return await utils.find_in_db("Occupation", {name: req.body.name}, res);
});
//testado
router.post('/createOccupation', async (req, res) => {
    try {
        utils.pause();
        console.log("Chamou POST Occupation");
        await utils.connect_db();
        const existingOcuppation = await Occupation.findOne({ name: req.body.name }).exec();
        if(existingOcuppation) return res.status(409).json({ message: 'Occupation already exists' });
        const highestIdOccupation = await Occupation.findOne().sort({ id: -1 }).exec();
        const highestId = highestIdOccupation ? highestIdOccupation.id : 0;
        let newOccupationData = { id: highestId + 1, name: req.body.name };
        let newOccupation = await utils.replicate("Occupation", "Post", newOccupationData);
        return res.json(newOccupation);
    } catch (error) {
        console.error('Error creating occupation:', error);
        return res.status(500).json({ message: error.message });
    }
});
//arrumar para usar o replicate
router.put('/updateOccupation', async (req, res) => {
    try {
        utils.pause();
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
//testado
router.delete('/deleteOccupation', async (req, res) => {
    try {
        utils.pause();
        await utils.connect_db();
        const used = await Character.findOne({fid_occupation: req.body.id});
        if(used) return res.status(403).json({message: "There is at least one Character of this occupation. Edit the character before deletins this occupation"});
        const exist = await Occupation.findOne({name: req.body.name});
        if(!exist) return res.status(404).json("There is no such Occupation");
        const data = await utils.replicate("Occupation", "Delete", req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error deleting occupation:', error);
        return res.status(500).json({ message: error.message });
    }
});

router.get('/currentDB', (req, res) => { return res.status(200).json(utils.used_db());});
router.get('/killDB', (req, res) => { return res.status(200).json(utils.kill());});
router.get('/ressurectDB', (req, res) => { return res.status(200).json(utils.ressurect());});
router.delete('/deleteAll', async (req, res) => {
    try {
        utils.pause();
        await utils.connect_db();
        await Character.deleteMany({ name: { $ne: 'Debora' } }).exec();
        return res.status(200).json("All data deleted except for Debora");
    } catch (error) {
        console.error('Error deleting all data:', error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;