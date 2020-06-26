use petgraph::graph::IndexType;
use petgraph::prelude::*;
use petgraph::EdgeType;
use rand::prelude::*;

pub fn si_model<N, E, Ty: EdgeType, Ix: IndexType, R: Rng>(
    graph: &Graph<N, E, Ty, Ix>,
    state: &Vec<bool>,
    p: f64,
    rng: &mut R,
) -> Vec<bool> {
    let n = graph.node_count();
    let mut next_state = vec![false; n];
    for u in graph.node_indices() {
        if state[u.index()] {
            next_state[u.index()] = true;
            for v in graph.neighbors_undirected(u) {
                if rng.gen_range(0.0, 1.0) < p {
                    next_state[v.index()] = true;
                }
            }
        }
    }
    next_state
}
