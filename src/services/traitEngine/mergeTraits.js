// src/services/traitEngine/mergeTraits.js

/**
 * merges two trait states based on the relationship edge between them.
 * @param {Traits} current - The current trait state.
 * @param {Traits} next - The next trait state to merge with the current state. 
 * @returns {Traits} The merged trait state.
 */
function mergeTraits(current, next) {
  console.log("Current:", current);
  console.log("Next:", next);
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

  return merged;
}

//note: check age anchor, affinity

module.exports = mergeTraits;