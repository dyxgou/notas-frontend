import { atom } from "nanostores";

export type Student = {
  id: number;
  name: string;
  course: number;
  parentPhone: number;
};

export const $students = atom<Student[]>([]);

export function addStudent(student: Student) {
  $students.value.push(student);
}

export function setAllStudents(students: Student[]) {
  $students.set(students);
}

export function resetStudents() {
  $students.set([]);
}
