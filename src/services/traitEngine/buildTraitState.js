// src/services/traitEngine/buildTraitState.js

const edgeToTrait =
  require("./traitTemplates");


/**
 * merges two trait states based on the relationship edge between them.
 * @param {Traits} current - The current trait state.
 * @param {Traits} next - The next trait state to merge with the current state. 
 * @returns {Traits} The merged trait state.
 */
function mergeTraits(current, next) {
  if (!current || !next) {
    console.error("Invalid trait states");
    return null;
  }
  
  const merged = {};

  // -----------------------------------
  // GENERATION (pure arithmetic)
  // -----------------------------------

  merged.generation =
    current.generation +
    next.generation;

  // -----------------------------------
  // GENDER
  // -----------------------------------

  if (current.genderTo !== "either" && next.genderFrom !== "either" && current.genderTo !== next.genderFrom) {
    console.error("Gender mismatch");
    return null;
  }

  merged.genderTo = next.genderTo;
  merged.genderFrom = current.genderFrom;

  // -----------------------------------
  // AFFINITY (dominance rule)
  // -----------------------------------

  merged.affinity =
    (current.affinity === "in-law" ^
     next.affinity === "in-law")
      ? "in-law"
      : "blood";

  // -----------------------------------
  // LINEAGE
  // -----------------------------------

  merged.lineage =
    current.lineage !== "unknown"
      ? current.lineage
      : next.lineage;

  // -----------------------------------
  // RELATIVE AGE 
  // -----------------------------------

  merged.relativeAge =
    next.relativeAge !== "NA"
      ? next.relativeAge
      : current.relativeAge;

  // console.log("Merged traits:", merged);

  return merged;
}

function buildTraitState(edges, genderFrom) {

  if (!edges || edges.length === 0) {
    console.warn("No edges provided.");
    return null;
  }

  // clone first trait
  let state = {
    ...edgeToTrait[edges[0]]
  };

  state.genderFrom = genderFrom;

  // start from SECOND edge
  for (let i = 1; i < edges.length; i++) {

    const edge = edges[i];

    const nextTemplate =
      edgeToTrait[edge];

    if (!nextTemplate) {
      console.warn("Unknown edge:", edge);
      continue;
    }

    state =
      mergeTraits(
        state,
        nextTemplate
      );
  }

  return state;
}

module.exports =
  buildTraitState;