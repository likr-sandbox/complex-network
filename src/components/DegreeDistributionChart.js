import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ResponsiveBar } from "@nivo/bar";
import { Graph, degreeCentrality, histogram } from "./graph";

const degreeDistribution = async (graph) => {
  const centrality = await degreeCentrality(graph);
  const maxDegree = Math.max(...centrality);
  const bins = await histogram(centrality, maxDegree + 1, 0, maxDegree + 1);
  bins.forEach((item, i) => {
    item.x = item.x0.toFixed(0);
  });
  return bins;
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
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveBar
        data={data}
        keys={["y"]}
        indexBy="x"
        margin={{ top: 50, right: 50, bottom: 50, left: 80 }}
        padding={0.3}
        colors={{ scheme: "nivo" }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Degree",
          legendPosition: "middle",
          legendOffset: 32,
          format: (x) => {
            if (data.length < 50 || +x % 10 === 0) {
              return x;
            } else {
              return "";
            }
          },
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Frequency",
          legendPosition: "middle",
          legendOffset: -60,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default DegreeDistributionChart;
