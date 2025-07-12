type SubjectKind =
  | "math"
  | "ethics"
  | "religion"
  | "tech"
  | "art"
  | "physics"
  | "chemistry"
  | "philosophy"
  | "politics"
  | "social"
  | "spanish"
  | "english"
  | "sexual"
  | "project";

export type Subject = {
  kind: SubjectKind;
  title: string;
};

export type Period = {
  period: number;
  title: string;
};
