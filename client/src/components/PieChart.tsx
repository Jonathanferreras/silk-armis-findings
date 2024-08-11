import { PieChart as RechartsPieChart, Pie, Cell, Text } from "recharts";

const styles = {
  pieChart: {
    display: "flex",
    justifyContent: "center",
  },
};

export interface IPieChartData {
  name: string;
  value: number;
}

interface IPieChartProps {
  data: IPieChartData[];
  customCells?: boolean;
  customCellsFill?: unknown | null | string;
  width?: number;
  height?: 300;
}

export const PieChart = ({
  width = 400,
  height = 300,
  data,
  customCells = false,
  customCellsFill = null,
}: IPieChartProps) => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    name,
    value,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    outerRadius: number;
    name: string;
    value: string;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const lineX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
    const lineY = cy + outerRadius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <line
          x1={lineX}
          y1={lineY}
          x2={x}
          y2={y}
          stroke="black"
          strokeWidth={1}
        />
        <Text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${name.charAt(0).toUpperCase() + name.slice(1)}: ${value}`}
        </Text>
      </g>
    );
  };
  return (
    <div style={styles.pieChart}>
      <RechartsPieChart width={width} height={height}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {customCells &&
            data &&
            data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  customCellsFill[entry.name.toLowerCase()] || customCellsFill
                }
              />
            ))}
        </Pie>
      </RechartsPieChart>
    </div>
  );
};
