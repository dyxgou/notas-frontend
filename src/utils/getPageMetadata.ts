import { subject } from "@/actions/subject";
import type { Period, Subject, SubjectKind } from "@/types/subjects";
export const courses: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const titles: string[] = [
  "Pre Escolar",
  "Primero",
  "Segundo",
  "Tercero",
  "Cuarto",
  "Quinto",
  "Sexto",
  "Séptimo",
  "Octavo",
  "Noveno",
  "Décimo",
  "Once",
];

const periods: Period[] = [
  {
    period: 1,
    title: "Primer Periodo",
  },
  {
    period: 2,
    title: "Segundo Periodo",
  },
  {
    period: 3,
    title: "Tercer Periodo",
  },
  {
    period: 4,
    title: "Cuarto Periodo",
  },
];

export const subjects: Record<SubjectKind, string> = {
  math: "Matemáticas",
  ethics: "Ética",
  religion: "Religión",
  tech: "Informática",
  art: "Arte",
  physics: "Física",
  chemistry: "Química",
  philosophy: "Filosofía",
  politics: "Ciencias Políticas",
  social: "Ciencias Sociales",
  spanish: "Español",
  english: "Inglés",
  sexual: "Educación Sexual",
  project: "Proyecto",
};

export const getCoursesAndTitles = () => {
  return courses.map((course, i) => ({
    params: { course },
    props: { title: titles[i] },
  }));
};

export const getCoursesAndPeriods = () => {
  return courses.flatMap((course) => {
    return periods.map(({ period, title }) => ({
      params: { course, period },
      props: { title },
    }));
  });
};

export const getSubjectTitle = (subject: string): string | undefined => {
  if (subject in subjects) {
    return subjects[subject as SubjectKind];
  }

  return undefined;
};
