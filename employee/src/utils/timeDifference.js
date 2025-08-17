export const timeDifference = (time1, time2) => {
  let diff = Math.max(0, new Date(time2).getTime() - new Date(time1).getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));

  return { days, hours, minutes };
};
