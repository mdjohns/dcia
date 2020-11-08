import mongooseDataSeed, { Seeder } from "mongoose-data-seed";
import Course from "../src/models/Course";
import StudentOutcome from "../src/models/StudentOutcome";

const data = async () => {
  const so1 = await StudentOutcome.findOne({ studentOutcomeNumber: 1 });
  const so2 = await StudentOutcome.findOne({ studentOutcomeNumber: 2 });
  const so3 = await StudentOutcome.findOne({ studentOutcomeNumber: 3 });
  const so4 = await StudentOutcome.findOne({ studentOutcomeNumber: 4 });
  const so5 = await StudentOutcome.findOne({ studentOutcomeNumber: 5 });
  const so6 = await StudentOutcome.findOne({ studentOutcomeNumber: 6 });
  return [
    {
      title: "Programming1",
      courseNumber: 1500,
      studentOutcome: [so1, so2, so3],
    },
    {
      title: "Capstone",
      courseNumber: 4321,
      studentOutcome: [so4, so5, so6],
    },
  ];
};
class CoursesSeeder extends Seeder {
  async shouldRun() {
    return Course.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    const courses = await data();

    return Promise.all(
      courses.map(async (course) => {
        return Course.create(course);
      })
    );
  }
}

export default CoursesSeeder;
