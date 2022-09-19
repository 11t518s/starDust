export type DustPositionType = {
  id: dustColors;
  lat: number;
  lng: number;
  imagePath: string;
};

export const DustColors = {
  BLACK: "black",
  BLUE: "blue",
  PURPLE: "purple",
  RED: "red",
  YELLOW: "yellow",
} as const;

export type dustColors = typeof DustColors[keyof typeof DustColors];
