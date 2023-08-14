const mongoose = require('mongoose');

mongoose.connect('mongodb://benja:hola@localhost:51251/app?authSource=admin')


const mongo = mongoose.connection
mongo.on('error', (error) => console.log(error))
mongo.once('open', () => {
    console.log('connected to database')
})

module.exports = mongo