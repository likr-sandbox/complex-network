import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { Graph, degreeCentrality, histogram } from "./graph";

const degreeDistribution = async (graph) => {
  const n = await graph.nodeCount();
  const centrality = await degreeCentrality(graph);
  const maxDegree = Math.max(...centrality);
  const bins = await histogram(centrality, maxDegree + 1, 0, maxDegree + 1);
  bins.forEach((item, i) => {
    item.x = item.x0.toFixed(0);
  });
  return [
    {
      id: "degree",
      data: bins
        .filter(({ x0, y }) => x0 > 0 && y > 0)
        .map(({ x0: x, y }) => ({ x, y: y / n })),
    },
  ];
};

const DegreeDistributionChart = () => {
  const graphPtr = useSelector(({ graphPtr }) => graphPtr);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (graphPtr) {
      (async () => {
        const graph = new Graph(graphPtr);
        const data = await degreeDistribution(graph);
        setData(data);
      })();
    }
  }, [graphPtr]);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ResponsiveScatterPlot
        data={data}
        margin={{ top: 10, right: 20, bottom: 70, left: 90 }}
        xScale={{ type: "log", min: 1, max: "auto" }}
        yScale={{ type: "log", min: 1e-4, max: 1 }}
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Degree",
          legendPosition: "middle",
          legendOffset: 46,
          format: (index) => {
            const e = index.toExponential(1);
            return e.startsWith("1") ? e : "";
          },
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Frequency",
          legendPosition: "middle",
          legendOffset: -60,
          format: (index) => {
            const e = index.toExponential(1);
            return e.startsWith("1") ? e : "";
          },
        }}
      />
    </div>
  );
};

export default DegreeDistributionChart;
