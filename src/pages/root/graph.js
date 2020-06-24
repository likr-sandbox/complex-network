import worker from "./graph.worker";

const mod = worker();

export class Graph {
  static async create() {
    const ptr = await mod.graphNew();
    return new Graph(ptr);
  }

  constructor(ptr) {
    this.ptr = ptr;
  }

  async nodeCount() {
    return mod.graphNodeCount(this.ptr);
  }

  async edgeCount() {
    return mod.graphEdgeCount(this.ptr);
  }

  async node(u) {
    return mod.graphNode(this.ptr, u);
  }

  async updateNode(u, obj) {
    return mod.graphUpdateNode(this.ptr, u, obj);
  }

  async edge(e) {
    return mod.graphEdge(this.ptr, e);
  }

  async updateEdge(e, obj) {
    return mod.graphUpdateEdge(this.ptr, e, obj);
  }

  async toJSON() {
    return mod.graphToJSON(this.ptr);
  }
}

export const randomGraph = async (n, p) => {
  return new Graph(await mod.randomGraph(n, p));
};

export const randomTree = async (n) => {
  return new Graph(await mod.randomTree(n));
};

export const randomScaleFreeGraph = async (n, c, gamma) => {
  return new Graph(await mod.randomScaleFreeGraph(n, c, gamma));
};

export const configurationModel = async (degrees) => {
  return new Graph(await mod.configurationModel(degrees));
};

export const diameter = async (graph) => {
  return mod.diameter(graph.ptr);
};

export const componentCount = async (graph) => {
  return mod.componentCount(graph.ptr);
};

export const triangles = async (graph) => {
  return mod.triangles(graph.ptr);
};

export const degreeCentrality = async (graph) => {
  return mod.degreeCentrality(graph.ptr);
};

export const closenessCentrality = async (graph) => {
  return mod.closenessCentrality(graph.ptr);
};

export const pagerank = async (graph, d, iter) => {
  return mod.pagerank(graph.ptr, d, iter);
};

export const histogram = async (x, bins, minX, maxX) => {
  return mod.histogram(x, bins, minX, maxX);
};
