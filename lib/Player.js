const Potion = require('../lib/potion');
const Character = require('./Character');


// This is the player constructor with its own methodes 

// inherit prototype methods from Character
class Player extends Character {
  
  constructor (name = ''){
    // call parent constructor here: and it need to be befor adding any values to the constructor itself 
    super(name);
  
    this.inventory = [new Potion('health'), new Potion()];
  }



// player status
getStats() {
  return {
    potions: this.inventory.length, //this will be 2 
    health: this.health,
    strength: this.strength,
    agility: this.agility
  };

};


// getInventory method
getInventory() {
  if (this.inventory.length) {
    return this.inventory;
  }
  return false;
};


// Add potion method
addPotion(potion) {
  this.inventory.push(potion);
};


// Use potion method 
usePotion(index) {
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

}


module.exports = Player;
