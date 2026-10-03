import { formatInches, formatSnowDay } from "@/lib/snow";

interface Props {
  values: (number | null)[];
  days: string[];
  todayIndex: number;
  scaleMax: number; // shared across tiles so equal bars mean equal snow
  label: string;
}

const BAR_WIDTH = 14;
const GAP = 2;
const PLOT_HEIGHT = 40;
const TICK = 5;
const RADIUS = 3;

// Column with a rounded data-end and a square base on the baseline.
function columnPath(x: number, height: number) {
  const r = Math.min(RADIUS, BAR_WIDTH / 2, height);
  const top = PLOT_HEIGHT - height;
  return [
    `M${x},${PLOT_HEIGHT}`,
    `V${top + r}`,
    `Q${x},${top} ${x + r},${top}`,
    `H${x + BAR_WIDTH - r}`,
    `Q${x + BAR_WIDTH},${top} ${x + BAR_WIDTH},${top + r}`,
    `V${PLOT_HEIGHT}`,
    "Z",
  ].join(" ");
}

export default function SnowChart({ values, days, todayIndex, scaleMax, label }: Props) {
  const width = values.length * BAR_WIDTH + (values.length - 1) * GAP;
  const summary = values
    .map((value, index) => `${formatSnowDay(days[index], { month: "short", day: "numeric" })} ${formatInches(value ?? 0)}`)
    .join(", ");

  return (
    <svg
      viewBox={`0 0 ${width} ${PLOT_HEIGHT + TICK}`}
      className="block h-auto w-full"
      role="img"
      aria-label={`${label}. Daily snowfall, past 7 days, today and 3-day forecast: ${summary}`}
    >
      <line x1={0} x2={width} y1={PLOT_HEIGHT + 0.5} y2={PLOT_HEIGHT + 0.5} className="snow-baseline" />
      {values.map((value, index) => {
        const x = index * (BAR_WIDTH + GAP);
        const inches = value ?? 0;
        const height = inches > 0 ? Math.max(2, (inches / scaleMax) * PLOT_HEIGHT) : 0;
        const isForecast = index >= todayIndex;
        const day = formatSnowDay(days[index], { weekday: "short", month: "short", day: "numeric" });

        return (
          <g key={days[index]}>
            <title>{`${day}: ${formatInches(inches)}${isForecast ? " (forecast)" : ""}`}</title>
            {/* Hit target taller and wider than the mark, so tiny bars are hoverable. */}
            <rect x={x - GAP / 2} y={0} width={BAR_WIDTH + GAP} height={PLOT_HEIGHT + TICK} fill="transparent" />
            {height > 0 && (
              <path d={columnPath(x, height)} className={isForecast ? "snow-bar-forecast" : "snow-bar-past"} />
            )}
          </g>
        );
      })}
      <line
        x1={todayIndex * (BAR_WIDTH + GAP) + BAR_WIDTH / 2}
        x2={todayIndex * (BAR_WIDTH + GAP) + BAR_WIDTH / 2}
        y1={PLOT_HEIGHT + 1}
        y2={PLOT_HEIGHT + TICK}
        className="snow-today-tick"
      />
    </svg>
  );
}
