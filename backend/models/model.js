const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    STR: { type: Number, required: true },
    CON: { type: Number, required: true },
    SIZ: { type: Number, required: true },
    DEX: { type: Number, required: true },
    APP: { type: Number, required: true },
    INT: { type: Number, required: true },
    POW: { type: Number, required: true },
    EDU: { type: Number, required: true },
    LUC: { type: Number, required: true },
    HP: { type: Number, required: true },
    MAG: { type: Number, required: true },
    LUC_Temp: { type: Number, required: true },
    SAN_Temp: { type: Number, required: true },
    fid_occupation: { type: Number, required: true }
}, { versionKey: false });

const OccupationSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true }
}, { versionKey: false });

const Character = mongoose.model('Characters', CharacterSchema);
const Occupation = mongoose.model('Occupations', OccupationSchema);

module.exports = { Character, Occupation };
