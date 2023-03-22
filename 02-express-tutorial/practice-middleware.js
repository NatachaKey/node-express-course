const express = require('express')

const consoleLog = (req, res, next) => {
    console.log("Hey there, now I will ivoke the next function");
    next()
}

module.exports = consoleLog