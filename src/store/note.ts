import { atom } from "nanostores";

export type Note = {
  id: number;
  gradeId: number;
  studentId: number;
  value: number;
};

export const notes = atom<Note[]>([]);

export function addNote(note: Note) {
  notes.set([...notes.get(), note]);
}

export function changeNoteValue(
  studentId: number,
  gradeId: number,
  newValue: number,
) {
  const index = notes
    .get()
    .findIndex(
      (note) => note.studentId === studentId && note.gradeId === gradeId,
    );

  const INDEX_NOT_FOUND = -1;

  if (index === INDEX_NOT_FOUND) {
    return;
  }

  notes.value[index].value = newValue;
  notes.notify();
}

export function getStudentAverage(studentId: number) {
  const studentNotes = notes
    .get()
    .filter((note) => note.studentId === studentId);

  console.log({ studentNotes });

  if (studentNotes.length === 0) {
    return 10;
  }

  let average = 0;

  for (const note of studentNotes) {
    average += note.value;
  }

  return Math.round(average / studentNotes.length);
}
