import type { FunctionalComponent } from "preact";
import GradesHeader from "./GradesHeader.tsx";
import StudentBody from "../Students/StudentBody.tsx";

const Grades: FunctionalComponent = () => {
  return (
    <table className="w-full table-auto">
      <GradesHeader />
      <StudentBody />
    </table>
  );
};
export default Grades;
