import React, { useEffect, useState } from "react";
import * as mod from "./graph";
import NetworkChart from "./NetworkChart";
import DegreeDistributionChart from "./DegreeDistributionChart";

const getGraph = async () => {
  return mod.randomScaleFreeGraph(1000, 1, 2);
};

const RootPage = () => {
  const [graph, setGraph] = useState(null);
  useEffect(() => {
    getGraph().then((graph) => {
      setGraph(graph);
    });
  }, []);
  if (graph == null) {
    return <p>loading</p>;
  }
  return (
    <div>
      <div style={{ width: "1200px", height: "1200px" }}>
        <NetworkChart graph={graph} />
      </div>
      <div style={{ width: "1200px", height: "400px" }}>
        <DegreeDistributionChart graph={graph} />
      </div>
    </div>
  );
};

export default RootPage;
