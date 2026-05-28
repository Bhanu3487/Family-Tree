// src/services/personSearchService.js

const people =
  require("../data/persons.json");

/**
 * Normalize string
 */
function normalize(text) {
  return text
    ?.toLowerCase()
    .trim()
    .replace(/\./g, "")
    .replace(/\s+/g, " ");
}

/**
 * Extract initial + remaining words
 *
 * "R. Bhanu" =>
 * {
 *   initial: "r",
 *   remaining: "bhanu"
 * }
 */
function parseName(query) {

  const cleaned =
    normalize(query);

  const words =
    cleaned.split(" ");

  let initial = null;

  // First word single char => initial
  if (words[0]?.length === 1) {
    initial = words[0];
    words.shift();
  }

  return {
    initial,
    remaining:
      words.join(" ")
  };
}

/**
 * Levenshtein distance
 */
function levenshtein(a, b) {

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {

    for (let j = 1; j <= a.length; j++) {

      if (b[i - 1] === a[j - 1]) {

        matrix[i][j] =
          matrix[i - 1][j - 1];

      } else {

        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * similarity score between 0 and 1
 */
function getSimilarity(a, b) {

  const distance =
    levenshtein(a, b);

  const maxLength =
    Math.max(a.length, b.length);

  if (maxLength === 0) {
    return 1;
  }

  return (
    1 - distance / maxLength
  );
}

/**
 * Score a person against query
 */
function scorePerson(person, parsedQuery) {

  const fullName =
    normalize(person.name);

  const nickName =
    normalize(person.nickname || "");

  const nameWords =
    fullName.split(" ");

  let score = 0;

  // -----------------------------------
  // INITIAL MATCH
  // -----------------------------------

  if (parsedQuery.initial) {

    const firstLetter =
      nameWords[0]?.[0];

    if (
      firstLetter ===
      parsedQuery.initial
    ) {
      score += 100;
    }
  }

  // -----------------------------------
  // EXACT FULL MATCH
  // -----------------------------------

  if (
    fullName ===
    parsedQuery.remaining
  ) {
    score += 1000;
  }

  // -----------------------------------
  // EXACT FIRST WORD MATCH
  // -----------------------------------

  if (
    nameWords[0] ===
    parsedQuery.remaining
  ) {
    score += 500;
  }

  // -----------------------------------
  // PARTIAL + FUZZY MATCH
  // -----------------------------------

  const compactFullName =
    fullName.replace(/\s+/g, "");

  const compactQuery =
    parsedQuery.remaining.replace(/\s+/g, "");

  // direct partial
  if (
    compactFullName.includes(compactQuery)
  ) {
    score += 200;
  }

  // fuzzy similarity
  else {

    const similarity =
      getSimilarity(
        compactFullName,
        compactQuery
      );

    if (similarity >= 0.8) {
      score += 180;
    }

    else if (similarity >= 0.65) {
      score += 120;
    }
  }

  // -----------------------------------
  // NICKNAME MATCH
  // -----------------------------------

  if (
    nickName.includes(
      parsedQuery.remaining
    )
  ) {
    score += 150;
  }

  return score;
}

/**
 * Find best matching people
 */
function searchPeople(query) {

  const parsedQuery =
    parseName(query);

  const matches = [];

  for (const person of people) {

    const score =
      scorePerson(
        person,
        parsedQuery
      );

    if (score > 0) {

      matches.push({
        person,
        score
      });
    }
  }

  matches.sort(
    (a, b) => b.score - a.score
  );

  return matches;
}

/**
 * Return best matched person
 */
function findPerson(query) {

  const matches =
    searchPeople(query);

  if (matches.length === 0) {
    return null;
  }

  return matches[0].person;
}

module.exports = {
  findPerson,
  searchPeople
};