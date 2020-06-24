use petgraph::graph::IndexType;
use petgraph::prelude::*;
use petgraph::EdgeType;

fn normalize(x: &mut Vec<f64>) {
    let s = x.iter().sum::<f64>();
    for xi in x.iter_mut() {
        *xi /= s;
    }
}

pub fn degree_centrality<N, E, Ty: EdgeType, Ix: IndexType>(
    graph: &Graph<N, E, Ty, Ix>,
) -> Vec<usize> {
    graph
        .node_indices()
        .map(|u| graph.neighbors_undirected(u).count())
        .collect::<Vec<_>>()
}

pub fn closeness_centrality<N, E, Ty: EdgeType, Ix: IndexType>(
    graph: &Graph<N, E, Ty, Ix>,
) -> Vec<f64> {
    let n = graph.node_count();
    let distance = super::algorithm::warshall_floyd(graph, |_, _| 1);
    let mut centrality = graph
        .node_indices()
        .map(|u| {
            let i = u.index();
            let mut s = 0.;
            for j in 0..n {
                if let Some(d) = distance[i][j] {
                    if d != 0 {
                        s += 1. / d as f64;
                    }
                }
            }
            s
        })
        .collect::<Vec<f64>>();
    normalize(&mut centrality);
    centrality
}

pub fn pagerank<N, E, Ty: EdgeType, Ix: IndexType>(
    graph: &Graph<N, E, Ty, Ix>,
    d: f64,
    iter: usize,
) -> Vec<f64> {
    let n = graph.node_count();
    let mut centrality = vec![1. / n as f64; n];
    let mut s = vec![0.; n];
    for _ in 0..iter {
        for u in graph.node_indices() {
            let i = u.index();
            s[i] = 0.;
            for v in graph.neighbors_undirected(u) {
                let j = v.index();
                s[i] += centrality[j] / graph.neighbors_undirected(v).count() as f64;
            }
        }
        for u in graph.node_indices() {
            let i = u.index();
            centrality[i] = (1. - d) + d * s[i];
        }
        normalize(&mut centrality);
    }
    centrality
}
