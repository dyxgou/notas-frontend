import { atom, onSet } from "nanostores";

export const $course = atom<number>(-1);
export const $subjectId = atom<number>(-1);

onSet($course, ({ newValue, abort }) => {
  if (newValue < 0 || newValue > 11) {
    abort();
  }
});

export function setCourse(course: number) {
  $course.set(course);
}

export function setSubjectId(subject: number) {
  $subjectId.set(subject);
}
