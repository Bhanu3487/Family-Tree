const {
  findRelationshipPath
} = require("./services/relationshipService");

const buildTraitState =
  require("./services/traitEngine/buildTraitState");

const edgeTrait =
  require("./services/traitEngine/traitTemplates");

const mergeTraitStates =
  require("./services/traitEngine/mergeTraits");

const { edges } =
  findRelationshipPath("4d8d0b80-11ac-4b79-8f05-831bf6a6562a", "6ab9f8d0-ec0e-4d55-a88f-5cbd7f2e1f41");
console.log(edges);

const finalState =
  buildTraitState(edges, "f");

console.log(finalState);