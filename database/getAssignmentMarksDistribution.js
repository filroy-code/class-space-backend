const { pool } = require("./database");

const getAssignmentMarksDistribution = async (classID, assignmentID) => {
  try {
    // adds all students who are in the class to the assignment table of the assignment being graded.
    const assignmentTable = `${classID}_${assignmentID}`;
    const sqlText = `INSERT INTO "public"."${assignmentTable}" (student) SELECT (students) FROM "public"."${classID}" WHERE (students) IS NOT NULL ON CONFLICT DO NOTHING`;
    await pool.query(sqlText);

    const sqlText2 = `SELECT * FROM "public"."${assignmentTable}" LEFT JOIN "public"."students" ON "public"."${assignmentTable}"."student" = "public"."students"."id" ORDER BY "lastname"`;
    const assignmentInfo = await pool.query(sqlText2);

    let outof;
    let scores = [];
    const distribution = [
      { score: "NM", number: 0 },
      { score: "<50%", number: 0 },
      { score: "50-59%", number: 0 },
      { score: "60-69%", number: 0 },
      { score: "70-79%", number: 0 },
      { score: "80-89%", number: 0 },
      { score: "90-100%", number: 0 },
    ];

    assignmentInfo.rows.forEach((entry) => {
      if (entry.outof) {
        outof = parseInt(entry.outof);
      }
    });

    // populates scores array with raw scores
    assignmentInfo.rows.forEach((entry) => {
      if (entry.score) {
        scores.push(parseInt(entry.score));
      }
      if (entry.student && !entry.score) {
        scores.push("NM");
      }
    });

    // replaces raw score to its percentage
    scores.forEach((score, index) => {
      if (typeof score === "number") {
        scores.splice(index, 1, score / outof);
      }
    });

    scores.forEach((score) => {
      if (score === "NM") {
        distribution[0].number = distribution[0].number + 1;
      }
      if (score < 0.5) {
        distribution[1].number = distribution[1].number + 1;
      }
      if (score >= 0.5 && score < 0.6) {
        distribution[2].number = distribution[2].number + 1;
      }
      if (score >= 0.6 && score < 0.7) {
        distribution[3].number = distribution[3].number + 1;
      }
      if (score >= 0.7 && score < 0.8) {
        distribution[4].number = distribution[4].number + 1;
      }
      if (score >= 0.8 && score < 0.9) {
        distribution[5].number = distribution[5].number + 1;
      }
      if (score >= 0.9) {
        distribution[6].number = distribution[6].number + 1;
      }
    });

    return distribution;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAssignmentMarksDistribution };
