const Potion = require('../lib/Potion');
  // this is the data that we got from the faked potion or mock
  console.log(`Potion${Potion}`);

function Player(name = '') {
  this.name = name;

  this.health = Math.floor(Math.random() * 10 + 95);
  this.strength = Math.floor(Math.random() * 5 + 7);
  this.agility = Math.floor(Math.random() * 5 + 7);
  this.inventory = [new Potion('health'), new Potion()];
  console.log(`this iventory is: ${this.inventory}`);

}

module.exports = Player;
