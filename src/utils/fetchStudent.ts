import { setAllStudents } from "@/store/student";
import { ActionError, actions } from "astro:actions";

export const fetchStudentsByCourse = async (course: number) => {
  const { data, error } = await actions.student.getByCourse({
    course,
  });

  if (error) {
    return error;
  }

  setAllStudents(data!);
};

type FetchResult<T> = Promise<
  { error: ActionError; data: undefined } | { error: undefined; data: T }
>;

export const fetchStudentParentPhone = async (
  id: number,
): FetchResult<{ parent_phone: string }> => {
  const { data, error } = await actions.student.getParentPhone({ id });

  if (error) {
    return { error, data: undefined };
  }

  return { error: undefined, data };
};
