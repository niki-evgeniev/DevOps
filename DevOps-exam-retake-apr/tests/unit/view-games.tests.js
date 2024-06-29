const assert = require('assert');
const fetch = require('node-fetch');

suite('View Games page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8888/games");
    let body = await res.text();
    assert.ok(body.includes("<h1>Added Games</h1>"));
  });
  
  test('Games list', async function() {
    let res = await fetch("http://localhost:8888/games");
    let body = await res.text();
    assert.ok(body.includes("<ul><li>Fallout 4 (9.7)</li><li>GTA (9.3)</li><li>Fortnite (8.7)</li></ul>"));
  });
});
