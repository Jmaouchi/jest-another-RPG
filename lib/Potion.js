function Potion(name) {

  //create an array of types
  this.types = ['strength', 'agility', 'health'];
  this.name = name || this.types[Math.floor(Math.random() * this.types.length)];
    // this will give a random between the 3 types
    console.log(`this.name is ${this.name}`);

  if (this.name === 'health') {
    this.value = Math.floor(Math.random() * 10 + 30);
  } else {
    this.value = Math.floor(Math.random() * 5 + 7);
  }
}

module.exports = Potion;