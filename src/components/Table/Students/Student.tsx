import type { Student as StudentType } from "@/store/student";
import type { FunctionalComponent } from "preact";
import Popup from "./Popup";

export type StudentProps = Omit<StudentType, "course" | "parentPhone"> & {
  index: number;
};

const Student: FunctionalComponent<StudentProps> = (student) => {
  return (
    <td
      key={student.id}
      className="sticky flex items-center gap-1 left-0 z-10 bg-white px-6 py-4 border-r border-gray-300 hover:bg-gray-50"
    >
      <span className="w-full">{student.name}</span>

      <Popup {...student} />
    </td>
  );
};

export default Student;
