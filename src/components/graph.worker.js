const mod = import("wasm");

export const graphNew = async () => {
  const { Graph } = await mod;
  const graph = new Graph();
  return graph.ptr;
};

export const graphNodeCount = async (ptr) => {
  const { Graph } = await mod;
  const graph = Graph.__wrap(ptr);
  return graph.nodeCount();
};

export const graphEdgeCount = async (ptr) => {
  const { Graph } = await mod;
  const graph = Graph.__wrap(ptr);
  return graph.edgeCount();
};

export const graphNode = async (ptr, u) => {
  const { Graph } = await mod;
  const graph = Graph.__wrap(ptr);
  return graph.nodeWeight(u);
};

export const graphUpdateNode = async (ptr, u, value) => {
  const { Graph } = await mod;
  const graph = Graph.__wrap(ptr);
  Object.assign(graph.nodeWeight(u), value);
};

export const graphEdge = async (ptr, e) => {
  const { Graph } = await mod;
  const graph = Graph.__wrap(ptr);
  return graph.edgeWeight(e);
};

export const graphUpdateEdge = async (ptr, e, value) => {
  const { Graph } = await mod;
  const graph = Graph.__wrap(ptr);
  Object.assign(graph.edgeWeight(e), value);
};

export const graphToJSON = async (ptr) => {
  const { Graph } = await mod;
  const graph = Graph.__wrap(ptr);
  return graph.toJSON();
};

export const randomGraph = async (n, p) => {
  const { randomGraph } = await mod;
  const seed = new Date().getTime();
  const graph = randomGraph(n, p, seed);
  return graph.ptr;
};

export const randomTree = async (n) => {
  const { randomTree } = await mod;
  const seed = new Date().getTime();
  const graph = randomTree(n, seed);
  return graph.ptr;
};

export const randomScaleFreeGraph = async (n, c, gamma) => {
  const { randomScaleFreeGraph } = await mod;
  const seed = new Date().getTime();
  const graph = randomScaleFreeGraph(n, c, gamma, seed);
  return graph.ptr;
};

export const configurationModel = async (degrees) => {
  const { configurationModel } = await mod;
  const seed = new Date().getTime();
  const graph = configurationModel(degrees, seed);
  return graph.ptr;
};

export const subgraph = async (ptr, components) => {
  const { Graph, subgraph } = await mod;
  const graph = Graph.__wrap(ptr);
  return subgraph(graph, components).ptr;
};

export const diameter = async (ptr) => {
  const { Graph, diameter } = await mod;
  const graph = Graph.__wrap(ptr);
  return diameter(graph, () => 1);
};

export const componentCount = async (ptr) => {
  const { Graph, componentCount } = await mod;
  const graph = Graph.__wrap(ptr);
  return componentCount(graph);
};

export const connectedComponents = async (ptr) => {
  const { Graph, connectedComponents } = await mod;
  console.log(await mod);
  const graph = Graph.__wrap(ptr);
  return connectedComponents(graph);
};

export const triangles = async (ptr) => {
  const { Graph, triangles } = await mod;
  const graph = Graph.__wrap(ptr);
  return triangles(graph);
};

export const degreeCentrality = async (ptr) => {
  const { Graph, degreeCentrality } = await mod;
  const graph = Graph.__wrap(ptr);
  return degreeCentrality(graph);
};

export const closenessCentrality = async (ptr) => {
  const { Graph, closenessCentrality } = await mod;
  const graph = Graph.__wrap(ptr);
  return closenessCentrality(graph);
};

export const pagerank = async (ptr, d, iter) => {
  const { Graph, pagerank } = await mod;
  const graph = Graph.__wrap(ptr);
  return pagerank(graph, d, iter);
};

export const histogram = async (x, bins, minX, maxX) => {
  const { histogram } = await mod;
  return histogram(x, bins, minX, maxX);
};

export const siModel = async (ptr, state, p) => {
  const { Graph, siModel } = await mod;
  const seed = new Date().getTime();
  const graph = Graph.__wrap(ptr);
  return siModel(graph, state, p, seed);
};
