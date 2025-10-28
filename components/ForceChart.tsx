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
    <div className="w-full h-full flex items-center justify-center">
      {/* ✅ Responsive height and ratio for small screens */}
      <div className="w-full aspect-[5/4] min-h-[220px] md:aspect-[4/3] md:min-h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            margin={{
              top: 50,
              right: 20,
              left: 25,
              bottom: 25,
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
                fontSize: 10, // smaller tick text
                fill: "#888",
              }}
              label={{
                value: "Recorrido (mm)",
                position: "insideBottom",
                dy: 20,
                fill: "#aaa",
                fontSize: 10, // smaller label
              }}
            />

            {/* Y Axis */}
            <YAxis
              stroke="#777"
              tick={{
                fontSize: 10,
                fill: "#888",
              }}
              label={{
                value: "Fuerza (gf)",
                angle: -90,
                position: "insideLeft",
                fill: "#aaa",
                fontSize: 10,
              }}
            />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid #333",
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
                transform: "translateY(-20px)",
                marginBottom: "25px",
                textAlign: "center",
                width: "100%",
                fontSize: "12px", // smaller on mobile
              }}
            />

            {/* Lines */}
            <Line
              data={pressData}
              type="linear"
              dataKey="force"
              name="Presión"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={false}
            />
            <Line
              data={releaseData}
              type="linear"
              dataKey="force"
              name="Liberación"
              stroke="#93c5fd"
              strokeWidth={1.8}
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
