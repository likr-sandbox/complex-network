import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Graph } from "./graph";
import { layout } from "./layout";
import { EgRenderer } from "react-eg-renderer";

const applyLayout = async (graph) => {
  const data = await graph.toJSON();
  return layout(data);
};

const NetworkChart = () => {
  const wrapperRef = useRef();
  const graphPtr = useSelector(({ graphPtr }) => graphPtr);
  const states = useSelector(({ states }) => states);
  const step = useSelector(({ step }) => step);
  const [data, setData] = useState({ nodes: [], links: [] });
  const [size, setSize] = useState({ width: 1, height: 1 });

  useEffect(() => {
    if (graphPtr) {
      (async () => {
        const graph = new Graph(graphPtr);
        setData(await applyLayout(graph));
      })();
    }
  }, [graphPtr]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setSize({
        width: wrapperRef.current.clientWidth,
        height: wrapperRef.current.clientHeight,
      });
    });
    resizeObserver.observe(wrapperRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const layoutData = useMemo(() => {
    const state = step < states.length ? states[step] : [];
    return Object.assign({}, data, {
      nodes: data.nodes.map((node, i) => {
        return Object.assign({}, node, {
          width: 5,
          height: 5,
          fillColor: state[i] ? "red" : "green",
        });
      }),
    });
  }, [data, states, step]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "600px" }}>
      <EgRenderer
        width={size.width}
        height={size.height}
        data={layoutData}
        default-node-stroke-width="0"
        default-link-stroke-color="#ccc"
      />
    </div>
  );
};

export default NetworkChart;
