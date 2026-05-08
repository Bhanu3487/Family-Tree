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

function getPersonById(id) {
  const persons = loadPersons();

  return persons.find(person => person.id === id);
}

function getParents(personId) {
  const person = getPersonById(personId);

  if (!person) {
    return null;
  }

  return {
    mother: person.mother
      ? getPersonById(person.mother)
      : null,

    father: person.father
      ? getPersonById(person.father)
      : null
  };
}

function getChildren(personId) {
  const persons = loadPersons();

  return persons.filter(person =>
    person.mother === personId ||
    person.father === personId
  );
}

module.exports = {
  loadPersons,
  savePersons,
  addPerson,
  getPersonById,
  getParents,
  getChildren
};