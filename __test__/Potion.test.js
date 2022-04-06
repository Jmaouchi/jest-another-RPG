const Potion = require('../lib/Potion.js');


test('creates a health potion object', () => {
  const potion = new Potion('health');

  expect(potion.name).toBe('health');
  console.log(`potion name is ${potion.name}`);

  expect(potion.value).toEqual(expect.any(Number));
  console.log(`potion value is ${potion.value}`);
});


test('creates a random potion object', () => {
  const potion = new Potion();

  expect(potion.name).toEqual(expect.any(String));
  expect(potion.name.length).toBeGreaterThan(0);
  expect(potion.value).toEqual(expect.any(Number));
});