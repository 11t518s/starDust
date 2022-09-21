import { selector } from "recoil";
import { dustApi } from "../apis/dust";
import { _dustInfoRefresher } from "./refresh.trigger.atom";

export const dustPositionSelector = selector({
  key: "dustInfo",
  get: async ({ get }) => {
    get(_dustInfoRefresher);
    const dustInfo = dustApi.getDustPosition();
    return dustInfo;
  },
  set: ({ set }) => {
    set(_dustInfoRefresher, (v) => v + 1);
  },
});

export const myInfoSelector = selector({
  key: "myInfo",
  get: async ({ get }) => {},
});
