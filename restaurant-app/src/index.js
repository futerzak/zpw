const express = require("express");
const bodyParser= require('body-parser');

const http = require('http').Server(app);
const io = require('socket.io')(http);

const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use((req,res,next) => {
    req.db = db;
    next();
});

app.use(express.static("angular"));

app.get("/api", (req, res) => {
    res.send("ok");
});

mongoose.connect('mongodb://localhost:27017/restaurantApp');

const models = require('./models')(mongoose);




io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

});


app.listen(80, () => {
    console.warn("App run on port 80");
});
