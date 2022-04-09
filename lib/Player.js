const Potion = require('../lib/potion');

// This is the player constructor with its own methodes 
function Player(name = '') {
  this.name = name;

  this.health = Math.floor(Math.random() * 10 + 95);
  this.strength = Math.floor(Math.random() * 5 + 7);
  this.agility = Math.floor(Math.random() * 5 + 7);

  this.inventory = [new Potion('health'), new Potion()];
}

// getHealth method
Player.prototype.getHealth = function() {
  return `${this.name}'s health is now ${this.health}!`;
};


// player status
Player.prototype.getStats = function() {
  return {
    potions: this.inventory.length, //this will be 2 
    health: this.health,
    strength: this.strength,
    agility: this.agility
  };

};


// getInventory method
Player.prototype.getInventory = function() {
  if (this.inventory.length) {
    return this.inventory;
  }
  return false;
};


// get status of the player if its alive or not, method 
Player.prototype.isAlive = function() {
  if (this.health === 0) {
    return false;
  }
  return true;
};


// Add potion method
Player.prototype.addPotion = function(potion) {
  this.inventory.push(potion);
};


// Use potion method 
Player.prototype.usePotion = function(index) {
  const potion = this.getInventory().splice(index, 1)[0];

  switch (potion.name) {
    case 'agility':
      this.agility += potion.value;
        console.log(`the agility value is : ${potion.value}`);
      break;
    case 'health':
      this.health += potion.value;
        console.log(`the health value is : ${potion.value}`);
      break;
    case 'strength':
      this.strength += potion.value;
      break;
  }
};


// Get attack value method 
Player.prototype.getAttackValue = function() {
  const min = this.strength - 5;
  const max = this.strength + 5;

  return Math.floor(Math.random() * (max - min) + min);
};

Player.prototype.reduceHealth = function(health) {
  this.health -= health;

  if (this.health < 0) {
    this.health = 0;
  }
};

module.exports = Player;
