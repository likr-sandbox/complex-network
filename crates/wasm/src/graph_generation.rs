use petgraph::graph::{node_index, IndexType};
use petgraph::prelude::*;
use petgraph::EdgeType;
use rand::prelude::*;
use std::cmp::{max, min};

pub fn random_graph<
    N,
    E,
    Ty: EdgeType,
    Ix: IndexType,
    R: Rng,
    F: Fn(usize) -> N,
    G: Fn(usize, usize) -> E,
>(
    n: usize,
    p: f64,
    rng: &mut R,
    create_node: F,
    create_edge: G,
) -> Graph<N, E, Ty, Ix> {
    let mut graph = Graph::with_capacity(0, 0);
    for i in 0..n {
        graph.add_node(create_node(i));
    }
    for i in 1..n {
        for j in 0..i {
            if rng.gen::<f64>() < p {
                graph.add_edge(node_index(i), node_index(j), create_edge(i, j));
            }
        }
    }
    graph
}

pub fn random_tree<
    N,
    E,
    Ty: EdgeType,
    Ix: IndexType,
    R: Rng,
    F: Fn(usize) -> N,
    G: Fn(usize, usize) -> E,
>(
    n: usize,
    rng: &mut R,
    create_node: F,
    create_edge: G,
) -> Graph<N, E, Ty, Ix> {
    let mut graph = Graph::with_capacity(0, 0);
    for i in 0..n {
        graph.add_node(create_node(i));
    }
    for i in 1..n {
        let j = rng.gen_range(0, i);
        graph.add_edge(node_index(i), node_index(j), create_edge(i, j));
    }
    graph
}

pub fn random_scale_free_graph<
    N,
    E,
    Ty: EdgeType,
    Ix: IndexType,
    R: Rng,
    F: Fn(usize) -> N,
    G: Fn(usize, usize) -> E,
>(
    n: usize,
    c: f64,
    gamma: f64,
    rng: &mut R,
    create_node: F,
    create_edge: G,
) -> Graph<N, E, Ty, Ix> {
    let mut p = (1..=n)
        .map(|k| c * (k as f64).powf(-gamma))
        .collect::<Vec<_>>();
    let s = p.iter().sum::<f64>();
    for pi in p.iter_mut() {
        *pi /= s;
    }
    loop {
        let degrees = (0..n)
            .map(|_| {
                let q = rng.gen_range(0.0, 1.0);
                let mut s = 0.;
                for i in (0..n).rev() {
                    s += p[i];
                    if q <= s {
                        return i + 1;
                    }
                }
                return 0;
            })
            .collect::<Vec<_>>();
        if let Ok(graph) = configuration_model(&degrees, rng, &create_node, &create_edge) {
            break graph;
        }
    }
}

fn shuffle<R: Rng>(x: &mut Vec<usize>, repeat: usize, rng: &mut R) {
    let n = x.len();
    for _ in 0..repeat {
        for i in 0..n {
            let j = rng.gen_range(0, n);
            x.swap(i, j);
        }
    }
}

pub fn configuration_model<
    N,
    E,
    Ty: EdgeType,
    Ix: IndexType,
    R: Rng,
    F: Fn(usize) -> N,
    G: Fn(usize, usize) -> E,
>(
    degrees: &Vec<usize>,
    rng: &mut R,
    create_node: F,
    create_edge: G,
) -> Result<Graph<N, E, Ty, Ix>, String> {
    let n = degrees.len();
    let m = degrees.iter().sum::<usize>();
    if m % 2 != 0 || m > n * (n - 1) / 2 {
        return Err("invalid degree sequence".into());
    }
    if !super::algorithm::is_graphical(degrees) {
        return Err("degree sequence is not graphical".into());
    }

    let mut nodes = vec![];
    for i in 0..n {
        for _ in 0..degrees[i] {
            nodes.push(i);
        }
    }
    shuffle(&mut nodes, 10, rng);
    let mut edges = vec![];
    for i in (0..nodes.len()).step_by(2) {
        if nodes[i] != nodes[i + 1] {
            edges.push((min(nodes[i], nodes[i + 1]), max(nodes[i], nodes[i + 1])));
        }
    }
    edges.sort();
    edges.dedup();

    let mut graph = Graph::with_capacity(0, 0);
    for i in 0..n {
        graph.add_node(create_node(i));
    }
    for &(i, j) in &edges {
        graph.add_edge(node_index(i), node_index(j), create_edge(i, j));
    }
    Ok(graph)
}
