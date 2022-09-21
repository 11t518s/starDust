export type DustPositionType = {
  id: dustColors;
  lat: number;
  lng: number;
  imagePath: string;
};

export type Catch = {
  itemId: string;
  caughtAt: Date;
};

export const DustColors = {
  BLACK: "black",
  BLUE: "blue",
  PURPLE: "purple",
  RED: "red",
  YELLOW: "yellow",
} as const;

export type dustColors = typeof DustColors[keyof typeof DustColors];

export const CatchProgress = {
  BeforeStart: "beforeStart",
  InProgress: "inProgress",
  Finish: "finish",
  loading: "loading",
} as const;

export type catchProgress = typeof CatchProgress[keyof typeof CatchProgress];
