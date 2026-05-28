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


// -----------------------------------
// SEARCH PEOPLE
// -----------------------------------

const personA =
  findPerson("Rama");

const personB =
  findPerson("Jhansi Lakshmi");

if (!personA || !personB) {

  console.log("Person not found");
  return;
}

console.log(
  "Matched:",
  personA.name,
  "->",
  personB.name
);

// -----------------------------------
// FIND RELATIONSHIP PATH
// -----------------------------------

const { edges } =
  findRelationshipPath(
    personA.id,
    personB.id
  );

console.log("Edges:", edges);

// -----------------------------------
// BUILD TRAIT STATE
// -----------------------------------

const finalState =
  buildTraitState(
    edges,
    personA.gender === "male"
      ? "m"
      : "f"
  );

console.log("Trait State:");
console.log(finalState);

// -----------------------------------
// FINAL RELATION
// -----------------------------------

const relation =
  traitToRelation(finalState);

console.log(
  `${personB.name} is ${relation} to ${personA.name}`
);