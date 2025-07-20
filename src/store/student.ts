import { actions } from "astro:actions";
import { atom, onMount, onSet, task } from "nanostores";
import { $course } from "./config";
import { navigate } from "astro:transitions/client";

export type Student = {
  id: number;
  name: string;
  course: number;
  parentPhone: string;
};

export const students = atom<Student[]>([]);

onMount(students, () => {
  task(async () => {
    const { data, error } = await actions.student.getByCourse({
      course: $course.get(),
    });

    if (error || !data) {
      navigate("/404");
    }

    students.set(data!);
  });
});

onSet(students, ({ newValue }) => {
  newValue.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
});

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
