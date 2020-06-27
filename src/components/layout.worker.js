const mod = import("egraph");

export const layout = async (data) => {
  const { Graph, SimulationBuilder } = await mod;
  const graph = new Graph();
  for (const node of data.nodes) {
    graph.addNode(+node.id, node);
  }
  for (const link of data.links) {
    graph.addEdge(+link.source, +link.target, link);
  }

  const builder = SimulationBuilder.defaultNonConnected();
  const simulation = builder.start(graph);
  for (const u of graph.nodes()) {
    const node = graph.node(u);
    node.x = simulation.x(u);
    node.y = simulation.y(u);
  }
  return data;
};
