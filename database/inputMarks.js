const { pool } = require("./database");

// assignment should be in ${classID}_${assignmentName} format, students should be an array of IDs, scores an array of scores.
async function inputMarks(assignment, students, scores) {
  try {
    pool.connect(async function (err, client, done) {
      for (i = 0; i < students.length; i++) {
        const sqlText = `INSERT INTO ${assignment}(student, score) VALUES(${students[i]}, ${scores[i]}) ON CONFLICT (student) DO UPDATE SET score = ${scores[i]}`;
        await client.query(sqlText);
      }
      done();
    });
  } catch (err) {
    console.log(err);
  }
  await pool.end();
}

// inputMarks("max_gym_weight_room", ["123", "666"], [10, 7]);
