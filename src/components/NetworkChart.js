import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ResponsiveNetwork } from "@nivo/network";
import { Graph } from "./graph";

const nodelink = async (graph, state) => {
  const data = await graph.toJSON();
  data.nodes.forEach((node, i) => {
    node.id = node.id.toString();
    node.radius = 3;
    if (state[i]) {
      node.color = "red";
    } else {
      node.color = "green";
    }
  });
  for (const link of data.links) {
    link.source = link.source.toString();
    link.target = link.target.toString();
    link.distance = 30;
  }
  return data;
};

const NetworkChart = () => {
  const graphPtr = useSelector(({ graphPtr }) => graphPtr);
  const states = useSelector(({ states }) => states);
  const step = useSelector(({ step }) => step);
  const [data, setData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    if (graphPtr) {
      (async () => {
        const graph = new Graph(graphPtr);
        const state = step < states.length ? states[step] : [];
        const data = await nodelink(graph, state);
        setData(data);
      })();
    }
  }, [graphPtr, states, step]);

  return (
    <div style={{ width: "100%", height: "800px" }}>
      <ResponsiveNetwork
        nodes={data.nodes}
        links={data.links}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        iterations={90}
        repulsivity={30}
        nodeColor={(node) => node.color}
        nodeBorderColor="none"
        nodeBorderWidth={1}
        linkColor="#ccc"
        motionStiffness={160}
        motionDamping={12}
      />
    </div>
  );
};

export default NetworkChart;
