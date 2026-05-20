// src/models/person.js

const crypto = require("crypto");

class Person {
  constructor({
    id = null,
    initial = null,
    name,
    nickname = null,
    gender,
    dob = null,
    mother = null,
    father = null,
    spouses = [],
    siblingOrder = null
  }) {

    // -----------------------------------
    // ID
    // -----------------------------------

    this.id =
      id || crypto.randomUUID();

    // -----------------------------------
    // BASIC INFO
    // -----------------------------------

    this.initial = initial;

    this.name = name;

    this.nickname = nickname;

    // -----------------------------------
    // PERSONAL
    // -----------------------------------

    this.gender = gender;

    this.dob = dob;

    // -----------------------------------
    // FAMILY LINKS
    // -----------------------------------

    this.mother = mother;

    this.father = father;

    this.spouses = spouses;

    // -----------------------------------
    // SIBLING ORDER
    // -----------------------------------

    this.siblingOrder =
      siblingOrder;
  }
}

module.exports = Person;