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

/**
 * Determines the relationship edge between two people based on their IDs.
 * @param {string} fromPersonId - The ID of the first person.
 * @param {string} toPersonId - The ID of the second person.
 * @returns {string|null} The relationship edge (e.g., "mother") or null if no direct relationship exists.
 */

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


/**
 * Converts a path of person IDs to a list of relationship edges.
 * @param {string[]} path - An array of person (not ids) representing the path.
 * @returns {string[]} An array of relationship edges corresponding to the path.
 */
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


/** * Finds the relationship path between two people and converts it to edges.
 * @param {string} personA - The ID of the first person.
 * @param {string} personB - The ID of the second person.
 * @returns {Object} An object containing the path of people and the corresponding edges.
 */
function findRelationshipPath(personA, personB) {

  // -----------------------------------
  // STEP 1: FIND PATH IN GRAPH
  // -----------------------------------

  const path =
    findShortestRelationshipPath(
      personA,
      personB
    );

  // console.log("Path of People:", path.map(p => p.name));

  if (!path || path.length < 2) {
    return {
      path: [],
      edges: []
    };
  }

  // -----------------------------------
  // STEP 2: CONVERT PATH → EDGES
  // -----------------------------------

  const edges =
    convertPathToEdges(path);

  return {
    path,
    edges
  };
}

module.exports = {
  getRelationshipEdge,
  convertPathToEdges,
  findRelationshipPath
};