import { atom } from "nanostores";

export type Student = {
  id: number;
  name: string;
  course: number;
  parentPhone: string;
};

export const students = atom<Student[]>([]);

export function addStudent(student: Student) {
  const newStudents = [...students.get(), student];
  students.set(newStudents);
}

export function setAllStudents(newStudents: Student[]) {
  students.set(newStudents);
}

export function resetStudents() {
  students.set([]);
}

export function updateStudentName(index: number, newName: string) {
  students.value[index].name = newName;
  students.notify();
}
