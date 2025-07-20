import { students } from "@/store/student";
import { useStore } from "@nanostores/preact";
import Student from "./Student";
import type { FunctionalComponent } from "preact";

const StudentBody: FunctionalComponent = () => {
  const $students = useStore(students);

  return (
    <tbody className="bg-white divide-y divide-gray-300">
      {$students.map(({ id, name }, index) => (
        <tr className="hover:bg-gray-100 transition-colors duration-150">
          <Student id={id} name={name} index={index} />
        </tr>
      ))}
    </tbody>
  );
};

export default StudentBody;
