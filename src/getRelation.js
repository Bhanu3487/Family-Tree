// src/getRelation.js

const {
  findRelationshipPath
} = require("./services/relationshipService");

const buildTraitState =
  require("./services/traitEngine/buildTraitState");

const {
  traitToRelation
} = require("./services/traitEngine/traitToRelation");

const {
  findPerson
} = require("./services/personSearchService");


/**
 * finds the relationship between two people based on their names.
 * @param {string} nameFrom - The name of the first person.
 * @param  {string} nameTo - The name of the second person.
 * @returns {string} The relationship of the second person to the first person.
 */
function getRelation(nameFrom, nameTo) {
    // SEARCH PEOPLE
    const personA = findPerson(nameFrom);
    const personB = findPerson(nameTo);

    if (!personA || !personB) {
        console.log("Person not found");
        return null;
    }

    console.log("Finding Relationship between:",personA.name,"->", personB.name);

    // FIND RELATIONSHIP PATH
    const { edges } =findRelationshipPath( personA.id, personB.id);
    console.log("Edges:", edges);

    if (!edges || edges.length === 0) {
        console.log("No relationship found!");
        return null;
    }

    if (edges.length === 1) {
        console.log("Direct Relationship Found!");
        console.log(`${personB.name} is ${personA.name}'s ${edges[0]}`);
        return edges[0];
    }

    // BUILD TRAIT STATE
    const finalState = buildTraitState(edges,personA.gender === "male"? "m": "f");
    console.log("Trait State:", finalState);

    // FINAL RELATION
    const relation =traitToRelation(finalState);
    console.log(`${personB.name} is ${personA.name}'s ${relation}`);

    return relation;
}

exports.getRelation = getRelation;