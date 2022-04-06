const Player = require('../lib/Player.js');
const Potion = require('../lib/Potion.js');


// here we are moking the potion file and fake it to have only the data that the moke file has (health as name and 20 as value) then use it
// in player.js file 
jest.mock('../lib/Potion.js');
console.log(new Potion());

test('creates a player object', () => {
  const player = new Player('Dave');

  expect(player.name).toBe('Dave');
    console.log(`player name is ${player.name}`);
  expect(player.health).toEqual(expect.any(Number));
    console.log(`player health is ${player.health}`);
  expect(player.strength).toEqual(
    expect.any(Number));
  expect(player.agility).toEqual(
    expect.any(Number));
  expect(player.inventory).toEqual(
    expect.arrayContaining([expect.any(Object)])
  );

  // expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});