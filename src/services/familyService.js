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

function getSpouses(personId) {
  const person = getPersonById(personId);

  if (!person) {
    return [];
  }

  return person.spouses.map(spouseId =>
    getPersonById(spouseId)
  );
}

function getChildren(personId) {
  const persons = loadPersons();

  return persons.filter(person =>
    person.mother === personId ||
    person.father === personId
  );
}

function getSiblings(personId) {
  const person = getPersonById(personId);

  if (!person) {
    return [];
  }

  const persons = loadPersons();

  return persons.filter(p => {
    if (p.id === personId) {
      return false;
    }

    const sameMother =
      person.mother &&
      p.mother === person.mother;

    const sameFather =
      person.father &&
      p.father === person.father;

    return sameMother && sameFather;
  });
}

function getNeighbors(personId) {
  const person = getPersonById(personId);

  if (!person) {
    return [];
  }

  const neighbors = [];

  // Parents
  const parents = getParents(personId);

  if (parents.mother) {
    neighbors.push(parents.mother);
  }

  if (parents.father) {
    neighbors.push(parents.father);
  }

  // Children
  neighbors.push(...getChildren(personId));

  // Siblings
  neighbors.push(...getSiblings(personId));

  // Spouses
  neighbors.push(...getSpouses(personId));

  // Remove duplicates
  const uniqueNeighbors = [];

  const seen = new Set();

  for (const neighbor of neighbors) {
    if (!seen.has(neighbor.id)) {
      seen.add(neighbor.id);

      uniqueNeighbors.push(neighbor);
    }
  }

  return uniqueNeighbors;
}

module.exports = {
  loadPersons,
  savePersons,
  addPerson,
  getPersonById,
  getParents,
  getSpouses,
  getChildren,
  getSiblings,
  getNeighbors
};