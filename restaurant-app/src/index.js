const express = require("express");
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const MongoClient = require('mongodb').MongoClient



app.use(express.static("angular"));

app.get("/api", (req, res) => {
    res.send("ok");
});

MongoClient.connect('mongodb://localhost:27017/restaurantApp', function (err, db) {
    if (err) throw err

    db.collection('products').find().toArray(function (err, result) {
        if (err) throw err

        console.log(result)
    })
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

});

app.listen(80, () => {
    console.log("App run on port 80");
});
