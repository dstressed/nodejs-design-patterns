function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function () {
  console.log('walk');
};

function Rabbit(name) {
  Animal.call(this, name);
}

Rabbit.prototype = Object.create(Animal.prototype);
Rabbit.prototype.constructor = Rabbit;
Rabbit.prototype.walk = function () {
  Animal.prototype.walk.apply(this);
  console.log('jump');
};

console.log(new Rabbit('1').name);

for (const key in new Rabbit('2')) {
  console.log(key);
}

console.log(Object.keys(new Rabbit('3')));
