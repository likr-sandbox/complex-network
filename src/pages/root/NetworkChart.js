import React, { useEffect, useState } from "react";
import { ResponsiveNetwork } from "@nivo/network";

const nodelink = async (graph) => {
  const data = await graph.toJSON();
  for (const node of data.nodes) {
    node.id = node.id.toString();
    node.radius = 3;
  }
  for (const link of data.links) {
    link.source = link.source.toString();
    link.target = link.target.toString();
    link.distance = 30;
  }
  return data;
};

const NetworkChart = ({ graph }) => {
  const [data, setData] = useState({ nodes: [], links: [] });
  useEffect(() => {
    nodelink(graph).then((data) => {
      setData(data);
    });
  }, [graph]);
  return (
    <div style={{ width: "1200px", height: "1200px" }}>
      <ResponsiveNetwork
        nodes={data.nodes}
        links={data.links}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        iterations={180}
        repulsivity={30}
        nodeColor="green"
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
