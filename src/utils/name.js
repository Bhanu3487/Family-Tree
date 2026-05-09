function getDisplayName(person) {

  // Explicit nickname
  if (person.nickname) {
    return person.nickname;
  }

  const parts = person.name.trim().split(" ");

  // One word name
  if (parts.length === 1) {
    return parts[0];
  }

  // Prefer middle/second name
  return parts[1];
}

module.exports = {
  getDisplayName
};