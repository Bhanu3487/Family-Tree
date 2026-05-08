const {
  getNeighbors,
  getPersonById
} = require("../services/familyService");

//BFS
function findShortestRelationshipPath(startId, targetId) {

  // Same person
  if (startId === targetId) {
    return [getPersonById(startId)];
  }

  const queue = [];

  const visited = new Set();

  // Initial path
  queue.push([startId]);

  visited.add(startId);

  while (queue.length > 0) {

    const currentPath = queue.shift();

    const currentPersonId =
      currentPath[currentPath.length - 1];

    const neighbors =
      getNeighbors(currentPersonId);

    for (const neighbor of neighbors) {

      if (visited.has(neighbor.id)) {
        continue;
      }

      const newPath = [
        ...currentPath,
        neighbor.id
      ];

      // Found target
      if (neighbor.id === targetId) {

        return newPath.map(id =>
          getPersonById(id)
        );
      }

      queue.push(newPath);

      visited.add(neighbor.id);
    }
  }

  // No connection found
  return null;
}

module.exports = {
    findShortestRelationshipPath,
};