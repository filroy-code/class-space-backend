const { pool } = require("./database");

// assignment should be in ${classID}_${assignmentName} format, students should be an array of IDs, scores an array of scores.
async function adjustWeighting(classID, assignmentData) {
  try {
    console.log(classID);
    let assignmentNames = [];
    let assignmentWeights = [];
    assignmentData.forEach((assignment) => {
      assignmentNames.push(assignment.name);
      assignmentWeights.push(assignment.weight);
    });

    console.log(assignmentNames);
    console.log(assignmentWeights);
    pool.connect(async function (err, client, done) {
      for (i = 0; i < assignmentNames.length; i++) {
        let values = [assignmentNames[i], assignmentWeights[i]];
        const sqlText = `INSERT INTO ${classID}(assignments, assignment_weight) VALUES ($1, $2) ON CONFLICT (assignments) DO UPDATE SET assignment_weight = $2`;
        await client.query(sqlText, values);
      }
      done();
    });
  } catch (err) {
    console.log(err);
    await pool.end();
  }
}

module.exports = { adjustWeighting };
// inputMarks("max_gym_weight_room", ["123", "666"], [10, 7]);
