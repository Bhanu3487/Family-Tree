const { addPerson } = require("./services/familyService");

const person = addPerson({
  name: "Vasanth",
  gender: "male"
});

console.log(person);