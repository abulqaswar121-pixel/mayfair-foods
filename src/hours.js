export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function localParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type) => parts.find((part) => part.type === type)?.value;
  return {
    day: SHORT_DAYS.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function getVenueStatus(venue, date = new Date(), timeZone = "Africa/Lagos") {
  if (venue.alwaysOpen) {
    return {
      isOpen: true,
      shortText: "Open now",
      detail: "Open 24 hours",
      closing: "24:00",
    };
  }

  const { day, minutes } = localParts(date, timeZone);
  const today = venue.days[day];
  const yesterday = venue.days[(day + 6) % 7];
  let active = null;
  let closing = null;

  if (today) {
    const open = toMinutes(today[0]);
    const close = toMinutes(today[1]);
    const overnight = close <= open;
    if ((!overnight && minutes >= open && minutes < close) || (overnight && minutes >= open)) {
      active = today;
      closing = today[1];
    }
  }

  // After midnight, check whether yesterday's late-night session is still on.
  if (!active && yesterday) {
    const open = toMinutes(yesterday[0]);
    const close = toMinutes(yesterday[1]);
    if (close <= open && close > 0 && minutes < close) {
      active = yesterday;
      closing = yesterday[1];
    }
  }

  if (active) {
    return {
      isOpen: true,
      shortText: "Open now",
      detail: `Until ${closing === "00:00" ? "midnight" : closing}`,
      closing,
    };
  }

  let next = null;
  for (let offset = 0; offset < 8 && !next; offset += 1) {
    const nextDayIndex = (day + offset) % 7;
    const schedule = venue.days[nextDayIndex];
    if (!schedule) continue;
    if (offset === 0 && toMinutes(schedule[0]) <= minutes) continue;
    next = { day: nextDayIndex, offset, time: schedule[0] };
  }

  const dayText = next?.offset === 0 ? "today" : next?.offset === 1 ? "tomorrow" : DAY_NAMES[next?.day ?? day];
  return {
    isOpen: false,
    shortText: "Closed",
    detail: next ? `Opens ${dayText} at ${next.time}` : "Hours to be confirmed",
    next,
  };
}

export function getOverallStatus(config, date = new Date()) {
  const venues = config.statusVenues.map((key) => ({ key, ...config.hours[key] }));
  for (const venue of venues) {
    const status = getVenueStatus(venue, date, config.timeZone);
    if (status.isOpen) {
      return {
        ...status,
        venueKey: venue.key,
        venueLabel: venue.label,
        detail: `${venue.label} · ${status.detail.toLowerCase()}`,
      };
    }
  }

  // Venue order in the config is the preferred order for the next-opening note.
  const nextVenue = venues.find((venue) => getVenueStatus(venue, date, config.timeZone).next);
  const nextStatus = nextVenue ? getVenueStatus(nextVenue, date, config.timeZone) : null;
  return {
    isOpen: false,
    shortText: "Closed now",
    venueLabel: nextVenue?.label ?? "Our venues",
    detail: nextVenue ? `${nextVenue.label} · ${nextStatus.detail}` : "Opening hours to be confirmed",
  };
}

export function formatHoursSummary(venue) {
  if (venue.alwaysOpen) return "Open 24 hours · every day";
  const order = [1, 2, 3, 4, 5, 6, 0];
  const allSame = venue.days.every((day) => JSON.stringify(day) === JSON.stringify(venue.days[0]));
  if (allSame && venue.days[0]) return `Daily · ${venue.days[0][0]}–${venue.days[0][1]}`;

  const groups = [];
  for (const day of order) {
    const schedule = venue.days[day];
    const signature = JSON.stringify(schedule);
    const previous = groups.at(-1);
    if (previous && previous.signature === signature && previous.end === (day + 6) % 7) {
      previous.end = day;
    } else {
      groups.push({ start: day, end: day, schedule, signature });
    }
  }

  return groups
    .map(({ start, end, schedule }) => {
      const days = start === end ? SHORT_DAYS[start] : `${SHORT_DAYS[start]}–${SHORT_DAYS[end]}`;
      return `${days} · ${schedule ? `${schedule[0]}–${schedule[1]}` : "Closed"}`;
    })
    .join(";  ");
}

export function openingHoursSchema(venue) {
  if (venue.alwaysOpen) {
    return [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_NAMES.map((day) => `https://schema.org/${day}`),
      opens: "00:00",
      closes: "23:59",
    }];
  }
  return venue.days.flatMap((schedule, index) => schedule ? [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${DAY_NAMES[index]}`,
    opens: schedule[0],
    closes: schedule[1] === "24:00" ? "23:59" : schedule[1],
  }] : []);
}
