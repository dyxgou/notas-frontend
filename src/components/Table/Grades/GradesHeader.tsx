import { grades } from "@/store/grade";
import { useStore } from "@nanostores/preact";
import { type FunctionalComponent } from "preact";
import GradeName from "./GradeName";

const GradesHeader: FunctionalComponent = () => {
  const $grades = useStore(grades);

  return (
    <thead>
      <tr className="sticky left-0 top-0 border-b border-b-gray-300">
        <th className="sticky left-0 z-10 bg-gray-50 px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300 md:min-w-[200px] max-w-fit">
          Estudiante
        </th>

        {$grades.map((grade) => (
          <GradeName {...grade} />
        ))}

        <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
          Promedio
        </th>
      </tr>
    </thead>
  );
};
export default GradesHeader;
