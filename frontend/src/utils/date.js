export const getDateFromTime = (time) => {
  const date = new Date();
  if (!time)
    return date;
  const [hours, minutes, seconds] = time.split(":");
  date.setHours(+hours || 0);
  date.setMinutes(+minutes || 0);
  date.setSeconds(+seconds || 0);
  return date;
};

export const mergeDateAndDuration = (date, duration) => {
  const d = new Date(date);
  const time = getDateFromTime(duration);
  d.setHours(time.getHours());
  d.setMinutes(time.getMinutes());
  d.setSeconds(time.getSeconds());
  return d;
};