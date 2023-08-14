const {Schema, model} = require('mongoose')

const toDoSchema = new Schema({
    text:        { type: String,  required:true },
    fechalimite: { type: Date,    required:true },
    done:        { type: Boolean }
})        
         
const ToDo = model('todo', toDoSchema)         

module.exports = ToDo