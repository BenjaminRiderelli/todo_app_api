const express = require('express');
const {todos} = require('../data/index');
const ToDo = require('../mongo/schemas/todo.js')

const todoRouter = express.Router();

// todoRouter.get('/todos', (req, res) => {
//   res.status(200).json({message:"Successfull fetch request", data:todos.filter(todo => todo !== null)}) 
// });

todoRouter.get('/todos', async (req, res) => {
  const allToDos = await ToDo.find()
  res.json(allToDos) 
});

// todoRouter.post('/todos' , (req, res) => {
  
//   const {text, done, fechalimite} = req.body
//   const newToDo = { 
//     id: todos.length,
//     fechalimite,
//     text, 
//     done }
//   todos.push(newToDo)
//   res.status(200).json({message:"Successfull fetch request", data:todos})
// });


todoRouter.post('/todos' , async (req, res) => {  
  const {text, done, fechalimite} = req.body
  const data = { 
    fechalimite,
    text, 
    done }
  const newToDo = new ToDo(data);
  await newToDo.save()
  res.json(newToDo)
});


todoRouter.get('/todos/:id', async (req, res) => {

  const selectedToDo = await ToDo.findById(req.params.id);
  res.json(selectedToDo);

  // const toDoId = Number(req.params.id)
  // const selectedToDo = todos.find(toDo => toDo.id === toDoId)
  // if(!selectedToDo){
  //   res.status(404).json("Resource not found")
  // }else{
  //   res.status(200).json({message:"Element found",data:selectedToDo})
  // }

});



todoRouter.patch('/todos/:id', async (req, res) => {


  const SelectedToDo = await ToDo.findByIdAndUpdate(req.params.id, req.body);
  res.json(SelectedToDo);

  // const toDoId = Number(req.params.id)
  // const selectedToDoIndex = todos.findIndex(toDo => toDo?.id === toDoId)
  // const updatedToDo = {
  //   ...todos[selectedToDoIndex],
  //   ...req.body,
  //   fechalimite:new Date(),
  // }
  // todos[selectedToDoIndex] =  updatedToDo
  
  // if(!selectedToDoIndex){
  //   res.status(404).json("Element not found")
  // }else{
  //   res.status(200).json({message:"Element updated", data:updatedToDo})
  // }  
});


todoRouter.delete('/todos/:id',  async (req, res) => {


  const SelectedToDo = await ToDo.findByIdAndDelete(req.params.id);
  res.json(SelectedToDo);

  // const toDoId = Number(req.params.id)
  // const selectedToDo = todos.find(toDo => toDo?.id === toDoId)
  // const selectedToDoIndex = todos.findIndex(toDo => toDo?.id === toDoId)
  // delete todos[selectedToDoIndex]

  // if(!selectedToDo){
  //   res.status(404).json("Resource not found")
  // }else{
  //   res.status(200).json({message:"Element deleted", data:todos})
  // }
  
});


module.exports = todoRouter;
