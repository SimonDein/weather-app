const temparatureFormatter = new Intl.NumberFormat("no-NO", {
  style: "unit",
  unit: "celsius",
  maximumFractionDigits: 0,
});

const windSpeedFormatter = new Intl.NumberFormat("no-NO", {
  unit: "meter-per-second",
  maximumFractionDigits: 0,
  style: "unit",
});

const distanceFormatter = new Intl.NumberFormat("en-EN", {
  style: "unit",
  unit: "kilometer",
  minimumFractionDigits: 1,
});

function unixToLocaleTimeString(unixTime: number) {
  const date = new Date(unixTime * 1000);

  return date.toLocaleTimeString("en-EN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export {
  temparatureFormatter,
  windSpeedFormatter,
  distanceFormatter,
  unixToLocaleTimeString,
};
