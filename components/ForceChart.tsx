"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ForceChartProps {
  pressData: { distance: number; force: number }[];
  releaseData: { distance: number; force: number }[];
}

export default function ForceChart({ pressData, releaseData }: ForceChartProps) {
  return (
    <div className="w-full flex items-center justify-center">
      {/* Bigger on large screens + more visible on small */}
      <div className="w-full max-w-4xl px-2 sm:px-4 md:px-0 h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] xl:h-[520px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={pressData} // just so XAxis has a default source; lines override
            margin={{
              top: 40,
              right: 24,
              left: 32,
              bottom: 32,
            }}
          >
            <CartesianGrid stroke="#222" strokeDasharray="3 3" />

            {/* X Axis */}
            <XAxis
              dataKey="distance"
              stroke="#777"
              type="number"
              domain={[0, 4]}
              tick={{
                fontSize: 15,
                fill: "#aaa",
              }}
              label={{
                value: "Recorrido (mm)",
                position: "insideBottom",
                dy: 20,
                fill: "#bbb",
                fontSize: 15,
              }}
            />

            {/* Y Axis */}
            <YAxis
              stroke="#777"
              tick={{
                fontSize: 15,
                fill: "#aaa",
              }}
              label={{
                value: "Fuerza (gf)",
                angle: -90,
                position: "insideLeft",
                fill: "#bbb",
                fontSize: 15,
                dx: -10,
              }}
            />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#111111",
                border: "1px solid white",
                color: "#fff",
                fontSize: "12px",
              }}
            />

            {/* Legend */}
            <Legend
              verticalAlign="top"
              align="center"
              wrapperStyle={{
                color: "#9ca3af",
                transform: "translateY(-10px)",
                marginBottom: "24px",
                textAlign: "center",
                width: "100%",
                fontSize: "12px",
              }}
            />

            {/* Lines */}
            <Line
              data={pressData}
              type="linear"
              dataKey="force"
              name="Presión"
              stroke="#60a5fa"
              strokeWidth={2.4}
              dot={false}
            />
            <Line
              data={releaseData}
              type="linear"
              dataKey="force"
              name="Liberación"
              stroke="#93c5fd"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
