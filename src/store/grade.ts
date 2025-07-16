import { atom } from "nanostores";

export type Grade = {
  id: number;
  subjectId: number;
  name: string;
};

export const grades = atom<Grade[]>([]);

export function addGrade(grade: Grade) {
  grades.set([...grades.get(), grade]);
}

export function setAllGrades(newGrades: Grade[]) {
  grades.set(newGrades);
}

export function resetGrades() {
  grades.set([]);
}
