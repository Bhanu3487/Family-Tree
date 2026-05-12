const edgeToTrait =
  require("./traitTemplates");

const mergeTraits =
  require("./mergeTraits");

function buildTraitState(edges, genderFrom) {

  let state = edgeToTrait[edges[0]];
  state.genderFrom = genderFrom;

  for (const edge of edges) {

    if (edge === edges[0]) {
      continue;
    } 
    
    const nextTemplate =
      edgeToTrait[edge];

    if (!nextTemplate) {
      console.warn("Unknown edge:", edge);
      continue;
    }

    state =
      mergeTraits(state, nextTemplate);
  }

  return state;
}

module.exports =
  buildTraitState;