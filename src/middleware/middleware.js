const express = require('express');

const textvalidation = (req, res, next) => {
    const text = req.body.text

    if(text.length < 10){
        res.status(400).json("Text must be at least 10 characters long") 
        return
    }
    next()
}



module.exports = {textvalidation};