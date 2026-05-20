// src/services/personSearchService.js

const people =
  require("../../data/persons.json");

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
  // PARTIAL NAME MATCH
  // -----------------------------------

  if (
    fullName.includes(
      parsedQuery.remaining
    )
  ) {
    score += 200;
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