const Potion = require('../lib/Potion');
  // this is the data that we got from the faked potion or mock
  console.log(`Potion${Potion}`);

  function Player(name = '') {
    this.name = name;
  
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
  
    this.inventory = [new Potion('health'), new Potion()];
      console.log('Inventory potion here is set as:', this.inventory);
      console.log('The length of that inventory array at the beggening is:', this.inventory.length);
  }
  

  //  adding a getStatus method
  Player.prototype.getStats = function() {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility
    };
  };
  
  //  adding a getInventory method
  Player.prototype.getInventory = function() {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  };

  //  adding a getHealth method
  Player.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}!`;
  };


  //  adding a isAlive method
  Player.prototype.isAlive = function(){
    if(this.health === 0){
      return false;
    }else{
      return true;
    }
    
  }


  //  reduce Health of player
  Player.prototype.reduceHealth = function (health){
    this.health -= health  //same than this.health = this.health - health // The subtraction assignment operator ( -= ) subtracts the value of the right operand from a variable and assigns the result to the variable
    console.log('this is health on the reduceHealth:',this.health);
    if(this.health < 0){
      this.health = 0
  }
  }


  //  reduce Health of player
  Player.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;
  
    return Math.floor(Math.random() * (max - min) + min);
  };


  //  add potion to inventory
  Player.prototype.addPotion = function(potion) {
    this.inventory.push(potion);
      console.log('Inventory potion after we pushed a new potion is', this.inventory);
      console.log('The length of that inventory array after the addPotion is :', this.inventory.length);
  };

    //  add potion to inventory
    Player.prototype.usePotion = function(index) {
      const potion = this.getInventory().splice(index, 1)[0];
      console.log('removed array', potion);
    
      switch (potion.name) {
        case 'agility':
          this.agility += potion.value;
          break;
        case 'health':
          this.health += potion.value;
          break;
        case 'strength':
          this.strength += potion.value;
          break;
      }
    };

module.exports = Player;
