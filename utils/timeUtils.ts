export const changeSecondToTime = (second: number) => {
  const millisecond = second * 1000;

  return new Date(millisecond).toISOString().slice(11, 19);
};
