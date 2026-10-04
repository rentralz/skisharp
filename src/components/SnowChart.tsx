import { formatInches, formatSnowDay } from "@/lib/snow";

interface Props {
  values: (number | null)[];
  days: string[];
  scaleMax: number; // shared across tiles so equal bars mean equal snow
  label: string;
}

const SLOT = 40;
const BAR_WIDTH = 24;
const PLOT_HEIGHT = 44;
const RADIUS = 4;

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

function describeDay(isoDate: string, value: number | null) {
  const day = formatSnowDay(isoDate, { weekday: "short", month: "short", day: "numeric" });
  return `${day}: ${value === null ? "no forecast" : formatInches(value)}`;
}

// Three days, so each bar carries its own day and amount underneath.
export default function SnowChart({ values, days, scaleMax, label }: Props) {
  const width = values.length * SLOT;
  const summary = values.map((value, index) => describeDay(days[index], value)).join(", ");

  return (
    <div className="shrink-0" style={{ width }}>
      <svg
        width={width}
        height={PLOT_HEIGHT + 1}
        viewBox={`0 0 ${width} ${PLOT_HEIGHT + 1}`}
        className="block"
        role="img"
        aria-label={`${label}. Forecast snowfall: ${summary}`}
      >
        <line x1={0} x2={width} y1={PLOT_HEIGHT + 0.5} y2={PLOT_HEIGHT + 0.5} className="snow-baseline" />
        {values.map((value, index) => {
          const inches = value ?? 0;
          const height = inches > 0 ? Math.max(2, (Math.min(inches, scaleMax) / scaleMax) * PLOT_HEIGHT) : 0;
          return (
            <g key={days[index]}>
              <title>{describeDay(days[index], value)}</title>
              {/* Hit target is the whole slot, so tiny bars are hoverable. */}
              <rect x={index * SLOT} y={0} width={SLOT} height={PLOT_HEIGHT + 1} fill="transparent" />
              {height > 0 && <path d={columnPath(index * SLOT + (SLOT - BAR_WIDTH) / 2, height)} className="snow-bar" />}
            </g>
          );
        })}
      </svg>
      <div
        className="mt-1 grid text-center text-[11px] leading-4 text-[#6b635b]"
        style={{ gridTemplateColumns: `repeat(${values.length}, ${SLOT}px)` }}
        aria-hidden="true"
      >
        {values.map((value, index) => (
          <span key={days[index]}>
            {formatSnowDay(days[index], { weekday: "short" })}
            <span className="block font-semibold text-[#201d1a]">{value === null ? "–" : formatInches(value)}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
