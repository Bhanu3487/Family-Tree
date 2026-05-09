const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const people = [];

// paths
const csvFile = path.join(__dirname, "../data/family.csv");
const outputFile = path.join(__dirname, "../data/persons.json");

fs.createReadStream(csvFile)
  .pipe(csv())
  .on("data", (row) => {
    // skip blank rows
    if (!row.id || !row.name) return;

    const person = {
      id: row.id.trim(),

      name: row.name?.trim() || null,

      nickname: row.nickname?.trim()
        ? row.nickname.trim()
        : null,

      gender:
        row.gender === "0"
          ? "male"
          : row.gender === "1"
          ? "female"
          : null,

      dob: row.dob?.trim()
        ? row.dob.trim()
        : null,

      mother: row.mother?.trim()
        ? row.mother.trim()
        : null,

      father: row.father?.trim()
        ? row.father.trim()
        : null,

      spouses: row.spouses?.trim()
        ? row.spouses
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],

      siblingOrder: row["sibling order"]?.trim()
        ? Number(row["sibling order"])
        : null
    };

    people.push(person);
  })
  .on("end", () => {
    // generate JS file content
    const fileContent = `${JSON.stringify(
      people,
      null,
      2
    )}\n`;

    // rewrite entire persons.js
    fs.writeFileSync(outputFile, fileContent);

    console.log("✅ persons.js rewritten successfully");
  });