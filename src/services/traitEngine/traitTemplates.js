// src/services/traitEngine/traitTemplates.js

const edgeToTrait = {
  mother: {
    generation: 1,
    genderTo: "f",
    genderFrom: "either",
    affinity: "blood",
    lineage: "maternal",
    relativeAge: "NA",
  },

  father: {
    generation: 1,
    genderTo: "m",
    genderFrom: "either",
    affinity: "blood",
    lineage: "paternal",
    relativeAge: "NA",
  },

  wife: {
    generation: 0,
    genderTo: "f",
    genderFrom: "m",
    affinity: "in-law",
    lineage: "none",
    relativeAge: "NA",
  },

  husband: {
    generation: 0,
    genderTo: "m",
    genderFrom: "f",
    affinity: "in-law",
    lineage: "none",
    relativeAge: "NA",
  },

  elder_sister: {
    generation: 0,
    genderTo: "f",
    genderFrom: "either",
    affinity: "blood",
    lineage: "unknown",
    relativeAge: "elder",
  },

  younger_sister: {
    generation: 0,
    genderTo: "f",
    genderFrom: "either",
    affinity: "blood",
    lineage: "unknown",
    relativeAge: "younger",
  },

  elder_brother: {
    generation: 0,
    genderTo: "m",
    genderFrom: "either",
    affinity: "blood",
    lineage: "unknown",
    relativeAge: "elder",
  },

  younger_brother: {
    generation: 0,
    genderTo: "m",
    genderFrom: "either",
    affinity: "blood",
    lineage: "unknown",
    relativeAge: "younger",
  }, 
  
  son: {
    generation: -1,
    genderTo: "m",
    genderFrom: "either",
    affinity: "blood",
    lineage: "none",
    relativeAge: "NA",
  },

  daughter: {
    generation: -1,
    genderTo: "f",
    genderFrom: "either",
    affinity: "blood",
    lineage: "none",
    relativeAge: "NA",
  }
};

module.exports = edgeToTrait;