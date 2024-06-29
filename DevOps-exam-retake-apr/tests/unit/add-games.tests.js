const assert = require('assert');
const fetch = require('node-fetch');

suite('Add Games page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8888/add-game");
    let body = await res.text();
    assert.ok(body.includes("<h1>Add New Game</h1>"));
  });

  test('Game HTML form', async function() {
    let res = await fetch("http://localhost:8888/add-game");
    let body = await res.text();
    
    let nameFieldFound = body.includes('<input id="name" type="text" name="name"/>');
    assert.ok(nameFieldFound, "Field 'name' is missing");

    let ratingFieldFound = body.includes('<input id="rating" type="text" name="rating"/>');
    assert.ok(ratingFieldFound, "Field 'rating' is missing");

    let buttonAddFound = body.includes('<button type="submit">Add</button>');
    assert.ok(buttonAddFound, "Button [Add] is missing");
  });

  test('Add valid game', async function() {
    let res = await fetch(
      "http://localhost:8888/add-game",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=The Witcher&rating=8.6"
      }
    );
    let body = await res.text();
    let gamesReturned = body.includes(
		"<ul><li>Fallout 4 (9.7)</li><li>GTA (9.3)</li><li>Fortnite (8.7)</li><li>The Witcher (8.6)</li></ul>");
    assert.ok(gamesReturned, "Add game failed");
  });

  test('Add invalid game', async function() {
     let res = await fetch(
      "http://localhost:8888/add-game",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=The Witcher&rating="
      }
    );
    let body = await res.text();
    let errMsg = body.includes("Cannot add game. Name and rating fields are required!");
    assert.ok(errMsg, "Add invalid game should display an error message");

    res = await fetch("http://localhost:8888/");
    body = await res.text();
	assert.ok(body.includes("Added games: <b>3</b>"), 
		"Add invalid game should not change the games count");
  });
});
