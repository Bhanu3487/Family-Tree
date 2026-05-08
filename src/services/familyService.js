const fs = require("fs");
const path = require("path");

const Person = require("../models/person");

const dataPath = path.join(__dirname, "../../data/persons.json");

function loadPersons() {
  const data = fs.readFileSync(dataPath, "utf-8");

  return JSON.parse(data);
}

function savePersons(persons) {
  fs.writeFileSync(
    dataPath,
    JSON.stringify(persons, null, 2)
  );
}

function addPerson(personData) {
  const persons = loadPersons();

  const person = new Person(personData);

  persons.push(person);

  savePersons(persons);

  return person;
}

module.exports = {
  loadPersons,
  savePersons,
  addPerson
};