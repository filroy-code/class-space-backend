const { pool } = require("./database");
const { getAssignmentMarks } = require("./getAssignmentMarks");

const getClassSummary = async (classID) => {
  try {
    const sqlText = `SELECT * FROM "public"."${classID}" LEFT JOIN "public"."students" ON "public"."${classID}"."students" = "public"."students"."id"`;
    const classInfo = await pool.query(sqlText);
    let assignmentMarks = {};
    let assignments = [];
    let assignmentAnalysis = [];

    let marksData = await Promise.all(
      classInfo.rows.map(async (entry) => {
        if (entry.assignments && !assignments.includes(entry.assignments)) {
          assignments.push(entry.assignments);
          assignmentMarks[`${entry.assignments}`] = {
            scores: [],
            outof: undefined,
            weight: entry.assignment_weight,
          };

          let marks = await getAssignmentMarks(classID, entry.assignments);
          marks.forEach((datum) => {
            if (datum.score) {
              {
                assignmentMarks[`${entry.assignments}`].scores.push(
                  datum.score
                );
              }
            }
            if (datum.outof) {
              assignmentMarks[`${entry.assignments}`].outof = datum.outof;
            }
            // if (datum.assignment_weight) {
            //   assignmentMarks[`${entry.assignments}`].weight =
            //     datum.assignment_weight;
            // }
          });
        }
        return assignmentMarks;
      })
    ).then((res) => {
      return res;
    });

    // console.log(marksData[0][`${assignments[0]}`]);
    for (let i = 0; i < assignments.length; i++) {
      let assignmentTotal = marksData[i][`${assignments[i]}`].scores.reduce(
        (prev, current) => parseInt(prev) + parseInt(current),
        0
      );
      let assignmentAverage =
        assignmentTotal / marksData[i][`${assignments[i]}`].scores.length;
      let analysis = {
        name: `${assignments[i]}`,
        average: assignmentAverage,
        outof: marksData[i][`${assignments[i]}`].outof,
      };
      assignmentAnalysis.push(analysis);
    }

    let aggregator = [];
    for (let i = 0; i < assignments.length; i++) {
      let assignmentName = assignmentAnalysis[i].name;
      let scoreAverage =
        assignmentAnalysis[i].average / parseInt(assignmentAnalysis[i].outof);
      let scoreWeight = marksData[0][`${assignmentName}`].weight;
      aggregator.push({
        assignmentName: assignmentAnalysis[i].name,
        assignmentAverage: scoreAverage,
        assignmentWeight: scoreWeight,
      });
    }

    let overall = 0;
    let acheivedMarks = [];
    let totalWeight = 0;
    aggregator.forEach((assignment) => {
      totalWeight += assignment.assignmentWeight;
    });

    aggregator.forEach((assignment) => {
      let assignmentValueMultiplier = assignment.assignmentWeight / totalWeight;
      let assignmentValue =
        assignment.assignmentAverage * assignmentValueMultiplier;
      acheivedMarks.push(assignmentValue);
    });

    acheivedMarks.forEach((mark) => {
      overall += mark;
    });

    // console.log(assignmentAnalysis);
    return {
      classInfo: classInfo.rows,
      marksData: assignmentAnalysis,
      overall: overall,
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getClassSummary };
// getClassInfo("max_gym");
