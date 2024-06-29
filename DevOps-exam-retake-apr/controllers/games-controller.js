function setup(app, games) {
    app.get('/', function(req, res) {
      let model = {
        title: "My Games Colletion",
        msg: "Games Collection",
        games: games
      };
      res.render('home', model);
    });
    
    app.get('/loaderio-97355a48d08652424ffe033c5cf3d460.txt', function(req, res) {
      res.send('loaderio-97355a48d08652424ffe033c5cf3d460');
    });
  
    app.get('/games', function(req, res) {
      let model = {title: "Games", games};
      res.render('games', model);
    });
  
    app.get('/about', function(req, res) {
      let model = {title: "About"};
      res.render('about', model);
    });
  
    app.get('/add-game', function(req, res) {
      let model = {title: "Add Game"};
      res.render('add-game', model);
    });
  
    function paramEmpty(p) {
      if (typeof(p) != 'string')
        return true;
      if (p.trim().length == 0)
        return true;
      return false;
    }
  
    app.post('/add-game', function(req, res) {
      if (paramEmpty(req.body.name) || paramEmpty(req.body.rating) ) {
        let model = {
          title: "Add Game", 
          errMsg: "Cannot add game. Name and rating fields are required!"
        };
        res.render('add-game', model);
        return;
      }
      let game = {
        name: req.body.name,
        rating: req.body.rating
      };
      games.push(game);
      res.redirect('/games');
    });
  }
  
  module.exports = { setup };