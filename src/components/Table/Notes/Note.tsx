import { addNote, changeNoteValue, type Note as NoteType } from "@/store/note";
import type { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import useDebounce from "@/hooks/useDebounce";
import type { TargetedEvent } from "preact/compat";
import { type Colors, getNoteColor } from "@/utils/getNoteColor";

type NoteProps = {
  studentId: number;
  gradeId: number;
};

const BACKGROUND_HEX_OPACITY = "20";

const Note: FunctionalComponent<NoteProps> = ({ studentId, gradeId }) => {
  const [note, setNote] = useState<NoteType>();
  const [noteValue, setNoteValue] = useState<number>(10);
  const [noteColor, setNoteColor] = useState<Colors>("#fca5a5");
  const newValue = useDebounce<number>(noteValue, 100);

  const handleValueChange = (e: TargetedEvent<HTMLInputElement>) => {
    e.preventDefault();

    const INVALID_VALUE = 0;

    const value = parseInt(e.currentTarget.value);
    if (isNaN(value)) {
      return;
    }

    if (value === INVALID_VALUE || value < 10 || value > 50) {
      return;
    }

    setNoteValue(value);
  };

  useEffect(() => {
    setNoteColor(getNoteColor(noteValue));
  }, [noteValue]);

  useEffect(() => {
    if (!note) {
      return;
    }

    const changeValue = async () => {
      const { error } = await actions.note.changeValue({
        id: note.id,
        value: newValue,
      });

      if (error) {
        console.log({ error });
      }
    };

    changeValue();
    changeNoteValue(studentId, gradeId, newValue);
  }, [newValue]);

  useEffect(() => {
    const createNote = async () => {
      const { data, error } = await actions.note.createAndGet({
        studentId,
        gradeId,
      });

      if (error || !data) {
        navigate("/404");
        return;
      }

      setNote(data);
      addNote(data);
      setNoteValue(data.value);
      setNoteColor(getNoteColor(noteValue));
    };

    createNote();
  }, []);

  return (
    <td key={note?.id} className="p-4 text-center border-r-1 border-r-gray-300">
      <form>
        <input
          type="text"
          value={noteValue}
          onInput={handleValueChange}
          style={{
            borderColor: noteColor,
            backgroundColor: noteColor + BACKGROUND_HEX_OPACITY,
          }}
          minlength={2}
          inputmode="numeric"
          maxlength={2}
          required
          className="w-16 px-2 py-1 text-sm text-center border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </form>
    </td>
  );
};

export default Note;
