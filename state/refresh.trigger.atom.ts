import { atom } from "recoil";

export const _dustInfoRefresher = atom<number>({
  key: "_dustInfo",
  default: 0,
});
