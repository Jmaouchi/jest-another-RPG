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
    this.isPlayerTurn = true;
  } else {
    this.isPlayerTurn = false;
  }
};


// Battle start
Game.prototype.battle = function() {
  if (this.isPlayerTurn) {
    inquirer
      .prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['Attack', 'Use potion']
      })
      .then(({ action }) => {
        if (action === 'Use potion') {
          // follow-up prompt will go here
        } else {
          const damage = this.player.getAttackValue();
          this.currentEnemy.reduceHealth(damage);
  
          console.log(`You attacked the ${this.currentEnemy.name}`);
          console.log(this.currentEnemy.getHealth());
        }
      });
  }
};




module.exports = Game;