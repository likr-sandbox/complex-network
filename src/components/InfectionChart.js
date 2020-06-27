import React from "react";
import { useSelector } from "react-redux";
import { ResponsiveLine } from "@nivo/line";

const InfectionChart = () => {
  const states = useSelector(({ states }) => states);
  const data = [
    {
      id: "Infection rate",
      data: states.map((state, i) => {
        return {
          x: i.toString(),
          y: state.filter((f) => f).length / state.length,
        };
      }),
    },
  ];

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 10, bottom: 70, left: 60 }}
        xScale={{ type: "linear" }}
        yScale={{ type: "linear", min: 0, max: 1 }}
        enablePoints={false}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Timestep",
          legendPosition: "middle",
          legendOffset: 46,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Infection Rate",
          legendPosition: "middle",
          legendOffset: -40,
        }}
      />
    </div>
  );
};

export default InfectionChart;
