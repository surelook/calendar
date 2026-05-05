const DAY_SHORT   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_FULL    = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const WEEK_LABELS = [
  'This week',
  'Next week',
  'The week after next',
  'In three weeks',
  'In four weeks',
];

const today = new Date();
today.setHours(0, 0, 0, 0);

function addDays(date, n) {
  const result = new Date(date);
  result.setDate(result.getDate() + n);
  return result;
}

function isSameDay(a, b) {
  return a.toDateString() === b.toDateString();
}

function startOfWeek(date) {
  const result = new Date(date);
  const day = result.getDay();
  // getDay() is 0=Sun, 1=Mon ... shift so Monday=0
  const diff = (day === 0) ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

function getParlance(date) {
  if (date < today) return '';

  const daysAway = Math.round((date - today) / 86400000);
  const dow = DAY_FULL[date.getDay()];

  if (daysAway === 0) return 'today';
  if (daysAway === 1) return 'tomorrow';
  if (daysAway < 7)   return `this ${dow}`;
  if (daysAway < 14)  return `next ${dow}`;
  if (daysAway < 21)  return `next ${dow} week`;
  if (daysAway < 28) {
    if (daysAway === 21) return 'today three weeks';
    if (daysAway === 22) return 'tomorrow three weeks';
    return `${dow} three weeks`;
  }

  return '';
}

function buildDayCell(date, weekIndex) {
  const isToday = isSameDay(date, today);
  const isPast  = date < today;
  const parlance = getParlance(date);

  const cell = document.createElement('div');
  cell.className = 'day-cell' + (isToday ? ' today' : '') + (isPast ? ' past' : '');

  const nameEl = document.createElement('div');
  nameEl.className = 'day-name';
  nameEl.textContent = DAY_SHORT[date.getDay()];

  const numEl = document.createElement('div');
  numEl.className = 'day-num';
  numEl.textContent = date.getDate();

  cell.appendChild(nameEl);
  cell.appendChild(numEl);

  if (parlance) {
    const pEl = document.createElement('div');
    pEl.className = 'day-parlance';
    pEl.textContent = parlance;
    cell.appendChild(pEl);
  }

  if (isToday) {
    const dot = document.createElement('div');
    dot.className = 'today-dot';
    cell.appendChild(dot);
  }

  return cell;
}

function buildWeekBlock(weekStart, weekIndex) {
  const block = document.createElement('div');
  block.className = 'week-block';

  // Label row
  const labelRow = document.createElement('div');
  labelRow.className = 'week-label-row';

  const lbl = document.createElement('span');
  lbl.className = 'week-label';
  lbl.textContent = WEEK_LABELS[weekIndex] || '';
  labelRow.appendChild(lbl);

  // Month badge — collect unique months for this week
  const months = [];
  for (let d = 0; d < 7; d++) {
    const m = MONTH_SHORT[addDays(weekStart, d).getMonth()];
    if (!months.includes(m)) months.push(m);
  }
  const badge = document.createElement('span');
  badge.className = 'month-badge';
  badge.textContent = months.join(' / ');
  labelRow.appendChild(badge);

  const divider = document.createElement('div');
  divider.className = 'week-divider';
  labelRow.appendChild(divider);

  // Days grid
  const daysRow = document.createElement('div');
  daysRow.className = 'days-row';

  for (let d = 0; d < 7; d++) {
    daysRow.appendChild(buildDayCell(addDays(weekStart, d), weekIndex));
  }

  block.appendChild(labelRow);
  block.appendChild(daysRow);
  return block;
}

function render() {
  const body = document.getElementById('cal-body');
  const weekStart = startOfWeek(today);

  for (let w = 0; w < 5; w++) {
    body.appendChild(buildWeekBlock(addDays(weekStart, w * 7), w));
  }
}

render();