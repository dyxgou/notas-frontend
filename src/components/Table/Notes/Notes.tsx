import { grades } from "@/store/grade";
import { useStore } from "@nanostores/preact";
import { Fragment, type FunctionalComponent } from "preact";
import Note from "./Note";

type NotesProps = {
  studentId: number;
};

const Notes: FunctionalComponent<NotesProps> = ({ studentId }) => {
  const $grades = useStore(grades);

  return (
    <Fragment>
      {$grades.map(({ id }) => (
        <Note studentId={studentId} gradeId={id} />
      ))}
    </Fragment>
  );
};

export default Notes;
