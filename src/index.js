const {
  findRelationshipPath
} = require("./services/relationshipService");

const buildTraitState =
  require("./services/traitEngine/buildTraitState");

const edgeTrait =
  require("./services/traitEngine/traitTemplates");

const mergeTraitStates =
  require("./services/traitEngine/buildTraitState");
const { traitToRelation } = require("./services/traitEngine/traitToRelation");

const { edges } =
  findRelationshipPath("f3b4f9b2-9b0e-4d63-9e5e-2f59d8dcb201", "2d4fcb8f-7d42-42a5-a7d3-9b7df4bc8c13");
console.log(edges);

const finalState =
  buildTraitState(edges, "f");

console.log(finalState);
console.log(traitToRelation(finalState, "f"));