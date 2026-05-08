const crypto = require("crypto");

class Person {
  constructor({
    name,
    gender,
    dob = null,
    mother = null,
    father = null,
    spouses = [],
    siblingOrder = null
  }) {
    this.id = crypto.randomUUID();

    this.name = name;
    this.gender = gender;

    this.dob = dob;

    this.mother = mother;
    this.father = father;

    this.spouses = spouses;

    this.siblingOrder = siblingOrder;
  }
}

module.exports = Person;