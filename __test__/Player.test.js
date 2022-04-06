const Player = require('../lib/Player.js');
const Potion = require('../lib/Potion.js');

// here we are moking the potion file and fake it to have only the data that the moke file has 
// => (health as name and 20 as value) then use it in player.js file 

jest.mock('../lib/Potion.js');
console.log(new Potion());

// Test 1
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

// Test 2 

test("gets player's stats as an object", () => {
  const player = new Player('Dave');

  expect(player.getStats()).toHaveProperty('potions');
  expect(player.getStats()).toHaveProperty('health');
  expect(player.getStats()).toHaveProperty('strength');
  expect(player.getStats()).toHaveProperty('agility');
});


// Test 3 to gete the iventory of the player
test('gets inventory from player or returns false', () => {
  const player = new Player('Dave');

  expect(player.getInventory()).toEqual(expect.any(Array));

  player.inventory = [];

  expect(player.getInventory()).toEqual(false);
});


// Test 4  to add another method to check  the player health.
test("gets player's health value", () => {
  const player = new Player('Dave');

  expect(player.getHealth()).toEqual(
    expect.stringContaining(player.health.toString()));
    console.log(`player health here is ${player.health}`);
});



// Test 5  to add another method to check if the player is alive.
test('checks if player is alive or not', () => {
  const player = new Player('Dave');

  expect(player.isAlive()).toBeTruthy();

  player.health = 0;

  expect(player.isAlive()).toBeFalsy();
});


// Test 6 to see if the correct amount of health is being subtracted from the Player health property
test("subtracts from player's health", () => {
  const player = new Player('Dave');
  const oldHealth = player.health;
  console.log(`old health is: ${oldHealth}`);

  // this should call the reduceHealth function prototype and use 5 as a paramatre 
  player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

   // this should call the reduceHealth function prototype and use 99999 as a paramatre 
  player.reduceHealth(99999);

    expect(player.health).toBe(0);
})


// Test 7 to get a player's attack value
test("gets player's attack value", () => {
  const player = new Player('Dave');
  player.strength = 10;

  expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});



// Test 8 to see if the potion is added correctly 
test('adds a potion to the inventory', () => {
  const player = new Player('Dave');
  const oldCount = player.inventory.length;

  player.addPotion(new Potion());

  expect(player.inventory.length).toBeGreaterThan(oldCount);
});


// test 9 to remove a  potion from the inventory
test('uses a potion from inventory', () => {
  const player = new Player('Dave');
  player.inventory = [new Potion(), new Potion(), new Potion()];
  const oldCount = player.inventory.length;

  //this will see wich potion it will remove from the inventory array, in this case its the [index 1]
  player.usePotion(1);

  expect(player.inventory.length).toBeLessThan(oldCount);
});