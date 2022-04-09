const inquirer = require('inquirer');
const Enemy = require('./enemy');
const Player = require('./player');


// this is the Game constructor with its methodes 
function Game() {

  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
  
}


// with this method we called both enemy object and player object
Game.prototype.initializeGame = function() {
  this.enemies.push(new Enemy('Man', 'knife'));
  this.enemies.push(new Enemy('orc', 'baseball bat'));
  this.enemies.push(new Enemy('skeleton', 'axe')); 


  // this to get the enemy num 1 from the array and we called the enemy object from enemy.js ( it will hold everything, health...)
  this.currentEnemy = this.enemies[0];


  // prompt the user to get the player infos 
  inquirer
  .prompt({
    type: 'text',
    name: 'name',
    message: 'What is your name?'
  })
  // destructure name from the prompt object, { name is the user input }
  .then(({ name }) => {
    // this is to call or invoc the player object using the user name
    this.player = new Player(name);

    // strat new battle
    this.startNewBattle()
    this.battle();
  });
};  


// print stats befor startrig the battle
Game.prototype.startNewBattle = function() {
  console.log('Your stats are as follows:');
  console.table(this.player.getStats());
  console.log(this.currentEnemy.getDescription());
  if (this.player.agility > this.currentEnemy.agility) {
    // this isPlayer turn will only run whenever the player.agility is > enemy.agility,  if its less then the battle wont start
    this.isPlayerTurn = true;
  } else {
    this.isPlayerTurn = false;
  }
};


// Battle start
Game.prototype.battle = function() {
  if (this.isPlayerTurn) {
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['Attack', 'Use potion']
      })
      .then(({ action }) => {
        if (action === 'Use potion') {
          // this when a user choose a use potion instead of attack 
          if (!this.player.getInventory()) {
            console.log("You don't have any potions!");

            return this.checkEndOfBattle();
          }
          // if there is something in the inventory then pring something 
          inquirer.prompt({
              type: 'list',
              name: 'action',
              message: 'Which potion would you like to use?',
              choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`) // item is the name of the choosen item on the array
              // like health or agility and the index is the index of that choosen item insid that array, +1 cause the index starts from 0        
            })
            .then(({ action }) => {
              const potionDetails = action.split(': ');
          
              this.player.usePotion(potionDetails[0] - 1);
              console.log(`You used a ${potionDetails[1]} potion.`);
              return this.checkEndOfBattle();
            }); 
        } else {
          const damage = this.player.getAttackValue();
          this.currentEnemy.reduceHealth(damage);
  
          console.log(`You attacked the ${this.currentEnemy.name}`);
          console.log(this.currentEnemy.getHealth());
          return this.checkEndOfBattle();
        }
      });
  }
};



// checking if the game is done or not 
Game.prototype.checkEndOfBattle = function() {
  if (this.player.isAlive() && this.currentEnemy.isAlive()) {
    this.isPlayerTurn = !this.isPlayerTurn;
    this.battle();
  }else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
    console.log(`You've defeated the ${this.currentEnemy.name}`);
  
    this.player.addPotion(this.currentEnemy.potion);
    console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);
  
    this.roundNumber++;
  
    if (this.roundNumber < this.enemies.length) {
      this.currentEnemy = this.enemies[this.roundNumber];
      this.startNewBattle();
    } else {
      console.log('You win!');
    }
  }
};




module.exports = Game;