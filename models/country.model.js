const mongoose = require("mongoose");

const schema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },

        code:{
            type: String,
            required: true,
            minLength: 3,
            maxLength: 3
        }
});

const countryModel = mongoose.model('Country',schema, 'country');
module.exports = countryModel;
