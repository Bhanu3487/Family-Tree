// src/services/traitEngine/traitToRelation.js

/**
 * Converts a trait state to a specific relationship term based on generation, affinity, lineage, gender, and relative age.
 * @param {Object} traitState - The state of the trait containing generation, affinity, lineage, genderTo, and relativeAge.
 * @returns {string} The specific relationship term corresponding to the given trait state.
 */

function traitToRelation(traitState) {

  let relation = "unknown";

  switch (traitState.generation) {

    case 0:

      if (traitState.affinity === "blood") {

        if (traitState.genderTo === "m") {

          if (traitState.relativeAge === "elder")
            relation = "Anna";
          else if (traitState.relativeAge === "younger")
            relation = "Thammudu";
          else
            relation = "Brother: Anna/Thammudu";
        }

        else if (traitState.genderTo === "f") {

          if (traitState.relativeAge === "elder")
            relation = "Akka";
          else if (traitState.relativeAge === "younger")
            relation = "Chelli";
          else
            relation = "Sister: Akka/Chelli";
        }
      }

      else if (traitState.affinity === "in-law") {

        if (traitState.genderTo === "m") {

          if (traitState.relativeAge === "elder")
            relation = "Bava";
          else if (traitState.relativeAge === "younger")
            relation = "Mardhi";
          else
            relation = "Brother-in-law: Bava/Mardhi";
        }

        else if (traitState.genderTo === "f") {

          if (traitState.relativeAge === "elder")
            relation = "Vadina";
          else if (traitState.relativeAge === "younger")
            relation = "Mardhalu";
          else
            relation = "Sister-in-law: Vadina/Mardhalu";
        }
      }

      break;

    case 1:

      if (traitState.affinity === "blood") {

        if (traitState.lineage === "maternal") {

          if (traitState.genderTo === "m")
            relation = "Maamayya";

          else if (traitState.genderTo === "f") {

            if (traitState.relativeAge === "elder")
              relation = "Peddamma";
            else if (traitState.relativeAge === "younger")
              relation = "Pinni";
            else
              relation = "Mother's Sister: Peddamma/Pinni";
          }
        }

        if (traitState.lineage === "paternal") {

          if (traitState.genderTo === "f")
            relation = "Athayya";

          else if (traitState.genderTo === "m") {

            if (traitState.relativeAge === "elder")
              relation = "Peddananna";
            else if (traitState.relativeAge === "younger")
              relation = "Babai";
            else
              relation = "Father's Brother: Peddananna/Babai";
          }
        }
      }

      else if (traitState.affinity === "in-law") {
        if (traitState.lineage === "maternal") {

          if (traitState.genderTo === "f")
            relation = "athayya";

          else if (traitState.genderTo === "m") {

            if (traitState.relativeAge === "elder")
              relation = "Peddananna";
            else if (traitState.relativeAge === "younger")
              relation = "Babai";
            else
              relation = "Mothers's Sister's Husband: Peddananna/Babai";
          }
        }

        if (traitState.lineage === "paternal") {

          if (traitState.genderTo === "m")
            relation = "Maamayya";

          else if (traitState.genderTo === "f") {

            if (traitState.relativeAge === "elder")
              relation = "Peddamma";
            else if (traitState.relativeAge === "younger")
              relation = "Pinni";
            else
              relation = "Father's Brother's Wife: Peddamma/Pinni";
          }
        }
      }

      break;

    case -1:
      relation =
        traitState.genderTo === "m"
          ? "Koduku"
          : "Kuthuru";
      break;

    case 2:
      if (traitState.genderTo === "m") {
        relation = "Tatayya";
      } else{
        if(traitState.lineage === "maternal") {
          relation = "Ammamma";
        } else if(traitState.lineage === "paternal") {
          relation = "Nannamma";
        } else relation = "Ammamma/Nannamma";
      }
      break;

    case -2:
      relation =
        traitState.genderTo === "m"
          ? "Manavadu"
          : "Manavaralu";
      break;

    case 3:
      relation =
        traitState.genderTo === "m"
          ? "Muttatayya"
          : "Tatamma";
      break;

    case -3:
      relation =
        traitState.genderTo === "m"
          ? "Mudhimanavadu"
          : "Munimanavaralu";
      break;

    default:
      relation = "unknown";
  }

  return relation;
}

module.exports = {
  traitToRelation,
};
