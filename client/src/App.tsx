import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Text } from "recharts";
import { IGroupedFindings, IRawFindings } from "./types/IFindings";

const styles = {
  appBar: {
    height: "8vh",
    display: "flex",
    alignItems: "center",
    paddingLeft: "25px",
    paddingRight: "25px",
    backgroundColor: "rgb(31 41 55 / 1)",
    color: "#fff",
    fontWeight: "bold",
  },
  appContent: {
    display: "flex",
    justifyContent: "center",
  },
};

function App() {
  const [groupedFindings, setGroupFindings] = useState<
    IGroupedFindings[] | null
  >(null);
  const [rawFindings, setRawFindings] = useState<IRawFindings[] | null>(null);
  const SEVERITY_COLOR_MAP: { [key: string]: string } = {
    low: "#00C49F", // Green for low severity
    medium: "#FFBB28", // Yellow for medium severity
    high: "#FF8042", // Orange for high severity
    critical: "#FF0000", // Red for critical severity
  };

  useEffect(() => {
    fetch("/api/v1/findings/grouped_findings_all")
      .then((res) => res.json())
      .then((json) => setGroupFindings(json.data));
  }, []);

  useEffect(() => {
    fetch("/api/v1/findings/raw_findings_all")
      .then((res) => res.json())
      .then((json) => setRawFindings(json.data));
  }, []);

  const generateGroupedFindingsBySeverity = () => {
    const result: { name: string; value: number }[] = [];
    const severityMap: { [key: string]: number } = {};

    if (groupedFindings) {
      for (const groupedFinding of groupedFindings) {
        severityMap[groupedFinding.severity] =
          (severityMap[groupedFinding.severity] || 0) + 1;
      }
    }

    for (const severityKey of Object.keys(severityMap)) {
      result.push({
        name: severityKey,
        value: severityMap[severityKey],
      });
    }

    return result;
  };

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
    <>
      <div style={styles.appBar}>Silk-Armis Findings</div>
      <div style={styles.appContent}>
        <PieChart width={400} height={300}>
          <Pie
            data={generateGroupedFindingsBySeverity()}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {generateGroupedFindingsBySeverity().map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={SEVERITY_COLOR_MAP[entry.name.toLowerCase()]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </>
  );
}

export default App;
