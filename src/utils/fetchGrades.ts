import { setAllGrades } from "@/store/grade";
import { actions } from "astro:actions";

export const fetchAllGrades = async (subjectId: number) => {
  const { data, error } = await actions.grade.getAllGrades({
    subjectId: subjectId,
  });

  if (error || !data) {
    return error;
  }

  setAllGrades(data!);
  return null;
};
