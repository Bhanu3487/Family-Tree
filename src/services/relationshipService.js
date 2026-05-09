const {
  getPersonById,
  getParents,
  getChildren,
  getSiblings,
  getSpouses
} = require("./familyService");

const {
  findShortestRelationshipPath
} = require("../utils/graph");

function isMale(person) {
  return person.gender === "male";
}

function isFemale(person) {
  return person.gender === "female";
}

function getRelationshipEdge(fromPersonId, toPersonId) {

  const fromPerson =
    getPersonById(fromPersonId);

  const toPerson =
    getPersonById(toPersonId);

  if (!fromPerson || !toPerson) {
    return null;
  }

  // -----------------------------------
  // PARENTS
  // -----------------------------------

  if (fromPerson.mother === toPerson.id) {
    return "mother";
  }

  if (fromPerson.father === toPerson.id) {
    return "father";
  }

  // -----------------------------------
  // CHILDREN
  // -----------------------------------

  const isChild =
    toPerson.mother === fromPerson.id ||
    toPerson.father === fromPerson.id;

  if (isChild) {

    if (isMale(toPerson)) {
      return "son";
    }

    return "daughter";
  }

  // -----------------------------------
  // SPOUSES
  // -----------------------------------

  const isSpouse =
    fromPerson.spouses.includes(toPerson.id);

  if (isSpouse) {

    if (isMale(toPerson)) {
      return "husband";
    }

    return "wife";
  }

  // -----------------------------------
  // SIBLINGS
  // -----------------------------------

  const siblings =
    getSiblings(fromPerson.id);

  const isSibling =
    siblings.some(
      sibling => sibling.id === toPerson.id
    );

  if (isSibling) {

    const hasOrder =
      fromPerson.siblingOrder &&
      toPerson.siblingOrder;

    // If order unknown
    if (!hasOrder) {

      if (isMale(toPerson)) {
        return "brother";
      }

      return "sister";
    }

    // Male sibling
    if (isMale(toPerson)) {

      if (
        toPerson.siblingOrder <
        fromPerson.siblingOrder
      ) {
        return "elder_brother";
      }

      return "younger_brother";
    }

    // Female sibling
    if (
      toPerson.siblingOrder <
      fromPerson.siblingOrder
    ) {
      return "elder_sister";
    }

    return "younger_sister";
  }

  return null;
}

function convertPathToEdges(path) {

  if (!path || path.length < 2) {
    return [];
  }

  const edges = [];

  for (let i = 0; i < path.length - 1; i++) {

    const currentPerson = path[i];

    const nextPerson = path[i + 1];

    const edge =
      getRelationshipEdge(
        currentPerson.id,
        nextPerson.id
      );

    edges.push(edge);
  }

  return edges;
}

module.exports = {
  getRelationshipEdge,
  convertPathToEdges
};