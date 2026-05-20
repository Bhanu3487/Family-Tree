const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const people = [];

// -----------------------------------
// PATHS
// -----------------------------------

const csvFile =
  path.join(__dirname, "../data/Family.csv");

const outputFile =
  path.join(__dirname, "../data/persons.json");

// -----------------------------------
// READ CSV
// -----------------------------------

fs.createReadStream(csvFile)
  .pipe(csv())

  .on("data", (row) => {

    // skip blank rows
    if (!row.id || !row.name) {
      return;
    }

    const person = {

      // -----------------------------------
      // BASIC INFO
      // -----------------------------------

      id:
        row.id?.trim() || null,

      initial:
        row.initial?.trim() || null,

      name:
        row.name?.trim() || null,

      nickname:
        row.nickname?.trim() || null,

      // -----------------------------------
      // GENDER
      // -----------------------------------

      gender:
        row.gender === "0"
          ? "male"
          : row.gender === "1"
          ? "female"
          : null,

      // -----------------------------------
      // DATES
      // -----------------------------------

      dob:
        row.dob?.trim() || null,

      // -----------------------------------
      // PARENTS
      // -----------------------------------

      mother:
        row.mother?.trim() || null,

      father:
        row.father?.trim() || null,

      // -----------------------------------
      // SPOUSES
      // -----------------------------------

      spouses:
        row.spouses?.trim()
          ? row.spouses
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],

      // -----------------------------------
      // SIBLING ORDER
      // -----------------------------------

      siblingOrder:
        row["sibling order"]?.trim()
          ? Number(row["sibling order"])
          : null
    };

    people.push(person);
  })

  // -----------------------------------
  // WRITE JSON
  // -----------------------------------

  .on("end", () => {

    fs.writeFileSync(
      outputFile,
      JSON.stringify(people, null, 2)
    );

    console.log(
      "✅ persons.json rewritten successfully"
    );
  });