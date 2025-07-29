import { getStudentAverage, notes } from "@/store/note";
import { getNoteColor, type Colors } from "@/utils/getNoteColor";
import type { FunctionalComponent } from "preact";
import { useLayoutEffect, useState } from "preact/hooks";

const BACKGROUND_HEX_OPACITY = "20";

type AverageProps = { studentId: number };
const Average: FunctionalComponent<AverageProps> = ({ studentId }) => {
  const [average, setAverage] = useState<number>(10);
  const [color, setColor] = useState<Colors>("#fca5a5");

  useLayoutEffect(() => {
    const unsubscribe = notes.subscribe(() => {
      const studentAverage = getStudentAverage(studentId);
      console.log({ studentAverage }, "nueva average");

      setAverage(studentAverage);
      setColor(getNoteColor(studentAverage));
    });

    return unsubscribe;
  }, []);

  return (
    <td className="p-4 text-center border-r-1 border-r-gray-300">
      <span
        style={{
          borderColor: color,
          backgroundColor: color + BACKGROUND_HEX_OPACITY,
        }}
        className="w-16 px-4 py-1 text-sm text-center border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {average}
      </span>
    </td>
  );
};
export default Average;
