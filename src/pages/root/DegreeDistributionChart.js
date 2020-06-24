import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import * as mod from "./graph";

const degreeDistribution = async (graph) => {
  const centrality = await mod.degreeCentrality(graph);
  const maxDegree = Math.max(...centrality);
  const bins = await mod.histogram(centrality, maxDegree + 1, 0, maxDegree + 1);
  bins.forEach((item, i) => {
    item.x = item.x0.toFixed(0);
  });
  return bins;
};

const DegreeDistributionChart = ({ graph }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (graph) {
      degreeDistribution(graph).then((data) => {
        setData(data);
      });
    }
  }, [graph]);
  return (
    <ResponsiveBar
      data={data}
      keys={["y"]}
      indexBy="x"
      margin={{ top: 50, right: 130, bottom: 50, left: 80 }}
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
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default DegreeDistributionChart;
