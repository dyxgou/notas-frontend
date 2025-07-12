import type { Period, Subject } from "@/types/subjects";
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

export const subjects: Subject[] = [
  {
    kind: "math",
    title: "Matemáticas",
  },
  {
    kind: "ethics",
    title: "Ética",
  },
  {
    kind: "religion",
    title: "Religión",
  },
  {
    kind: "tech",
    title: "Informática",
  },
  {
    kind: "art",
    title: "Arte",
  },
  {
    kind: "physics",
    title: "Física",
  },
  {
    kind: "chemistry",
    title: "Química",
  },
  {
    kind: "philosophy",
    title: "Filosofía",
  },
  {
    kind: "politics",
    title: "Ciencias Políticas",
  },
  {
    kind: "social",
    title: "Ciencias Sociales",
  },
  {
    kind: "spanish",
    title: "Español",
  },
  {
    kind: "english",
    title: "Inglés",
  },
  {
    kind: "sexual",
    title: "Educación Sexual",
  },
  {
    kind: "project",
    title: "Proyecto",
  },
];

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

export const getSubjects = () => {
  return courses.flatMap((course) => {
    return periods.flatMap(({ period }) =>
      subjects.map(({ kind, title }) => ({
        params: { course, period, subject: kind },
        props: { title },
      })),
    );
  });
};
