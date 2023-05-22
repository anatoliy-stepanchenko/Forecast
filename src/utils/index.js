const PRESSURE_UNITS = 0.750062;

export const getPressureMm = (hpa) => {
  return Math.round(hpa * PRESSURE_UNITS);
};

export const getTime = (seconds) => {
  return new Date(seconds * 1000).toLocaleTimeString("en-GB", {
    timeZone: "Atlantic/Reykjavik",
  });
};
