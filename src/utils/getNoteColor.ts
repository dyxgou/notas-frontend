const colors = ["#fca5a5", "#fdba74", "#93c5fd", "#86efac", "#86efac"] as const;

export type Colors = (typeof colors)[number];

export const getNoteColor = (value: number): Colors => {
  const colorIndex = Math.floor(value / 10) - 1;

  return colors[colorIndex];
};
