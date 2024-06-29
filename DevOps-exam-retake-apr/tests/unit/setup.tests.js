let server;

setup(function() {
  let games = [
    {"name" : "Fallout 4", "rating" : "9.7"},
    {"name" : "GTA", "rating" : "9.3"},
    {"name" : "Fortnite", "rating" : "8.7"}
  ];
  const express = require('express');
  const app = express();
  server = require('http').createServer(app);
  app.set('view engine', 'pug');
  app.use(require('body-parser')
    .urlencoded({extended:true}));
  const gamesController = 
    require("../../controllers/games-controller");
  gamesController.setup(app, games);
  server.listen(8888);
});

teardown(function() {
  server.close();
});
