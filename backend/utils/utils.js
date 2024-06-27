require('dotenv').config();
const baseUrl = process.env.DATABASE_URL;
const { Character, Occupation } = require('../models/model.js');
const mongoose = require('mongoose');

let databases = (() => {
    let dbArray = [];
    for (let i = 1; i <= 4; i++) {
        dbArray.push({
            id: i,
            uri: `${baseUrl}Server${i}`,
            nextServer: (i % 4),
            hasToken: i===4,
            active: true
        });
    }
    return dbArray;
})();

setInterval(() => {
    pass_token();
}, 1000);

function pass_token(){
    let current = current_db();
    console.log(`Server ${current.id} has the token`);
    current.hasToken = false;
    if(databases[current.nextServer].active) databases[current.nextServer].hasToken = true;
    else{
        let next = current.nextServer;
        let count = 0;
        while(!databases[next].active){
            count++;
            next = databases[next].nextServer;
            if(count === 4){
                console.log("All databases are dead. Token is stuck. Attempting to revive them...");
                ressurect();
            }
        }
        databases[next].hasToken = true;
    }
}

function current_db(){
    for(let database of databases){
        if(database.hasToken) return {database}
    }
}

//testado
async function connect_db() {
    await mongoose.disconnect();

    console.log(`Connecting to Server${current_db().id}@${current_db().uri}`);
    await mongoose.connect(current_db().uri);
    const database = mongoose.connection;
    
    database.on('error', (error) => {
        console.error('Connection error:', error);
        connect_db();
    });
    database.once('connected', () => {
        console.log(`Connected to Server${current_db().id}`);
    });
}
//testado
async function find_in_db(type, filter, res){
    let hasFilter = (Object.keys(filter).length !== 0);
    try {
        let data;
        await connect_db();
        if(type === "Character"){
            data = await Character.find(filter).exec();
            if(data.length === 0){
                if(hasFilter) return res.status(404).json("There is no such character");
                return res.status(404).json("There is no character");
            }
            if(hasFilter){
                const character = data[0].toObject();
                const { fid_occupation, ...characterData } = character;
                console.log(fid_occupation);
                const occupation = await Occupation.findOne({ id: fid_occupation }).select('-_id').exec();
                data = characterData;
                data.occupation = occupation.name;
            }
        }
        else if(type === "Occupation"){
            data = await Occupation.find(filter).exec();
            if(data.length === 0){
                if(hasFilter) return res.status(404).json("There is no such occupation");
                return res.status(404).json("There is no occupation");
                }
            if(hasFilter) data = await Occupation.findOne(filter).exec();
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error retrieving characters:', error);
        return res.status(500).json({ message: error.message });
    }
}

//TODO função para remover o _id e substituir o fid pelo nome da ocupação
//testado
async function put_post_character(operation, data, res){
    try {
        await connect_db();
        const ret = await Character.findOne({name: data.name});
        if(operation === "Put" && !ret) return res.status(404).json({message: "No character with this name found"});
        if(operation === "Post" && ret) return res.status(403).json({message: "This character already exists"});
        const { occupation, ...characterData } = data;
        const foundOccupation = await Occupation.findOne({ name: occupation }).exec();
        if (!foundOccupation) return res.status(404).json({ message: 'No occupation with this name found' });
        if(operation === "Post"){
            const highestIdCharacter = await Character.findOne().sort({ id: -1 }).exec();
            const highestId = highestIdCharacter ? highestIdCharacter.id : 0;
            characterData.id = highestId + 1;
        }
        characterData.fid_occupation = foundOccupation.id;
        const newCharacter = await replicate("Character", operation, characterData);
        return res.status(200).json(newCharacter);
    } catch (error) {
        console.error('Error creating character:', error);
        return res.status(500).json({ message: error.message });
    }
}
//testado
async function replicate(type, operation, data){
    let newObject;
    console.log("Entrou Replicate");
    for(let i = 0; i < databases_size(); i++){   
        await connect_db();
        if(operation === "Post"){
            console.log("Entrou Post Replicate");
            if(type === "Character") newObject = new Character(data);
            else if(type === "Occupation") newObject = new Occupation(data);
            await newObject.save();
        }
        else if(operation === "Put"){
            console.log("Entrou Put Replicate");
            if(type === "Character") newObject = await Character.findOneAndUpdate({ name: data.name }, data, { new: true }).exec();
            else if(type === "Occupation") newObject = await Occupation.findOneAndUpdate({name: data.name}, data, {new: true}).exec();
        }
        else if(operation === "Delete"){
            console.log("Entrou Delete Replicate");
            if(type === "Character") newObject = await Character.findOneAndDelete({name: data.name}).exec();
            else if(type === "Occupation") newObject = await Occupation.findOneAndDelete({name: data.name}).exec();
        }
        else console.log("DEU BO");
    }
    return newObject
}

function databases_size(){return databases.length;}

function kill(){
    current_db().active = false; 
    return ({message: `Banco de dados ${current_db().id} falhou`});
}

function ressurect(){
    for (let database of databases) database.active = true; 
    return ({message: "Todos os bancos voltaram a funcionar normalmente"});
}

module.exports = { connect_db, replicate, find_in_db, kill, ressurect, put_post_character, databases_size };