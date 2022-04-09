const Potion = require('./Potion');
const Character = require('./Character');

// This is the enemy constructor with its own methodes 


// inherit  methods from Character
class Enemy extends Character{

    constructor (name, weapon) {
    super(name, weapon);

    this.weapon = weapon;
    this.potion = new Potion();
  }

  
  reduceHealth (health){
    this.health -= health;

    if (this.health < 0) {
      this.health = 0;
    }
  };

  getDescription() {
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
  };

}
module.exports = Enemy;
