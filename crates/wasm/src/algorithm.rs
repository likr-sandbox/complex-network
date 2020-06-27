use petgraph::graph::IndexType;
use petgraph::prelude::*;
use petgraph::unionfind::*;
use petgraph::visit::GetAdjacencyMatrix;
use petgraph::EdgeType;
use std::cmp::Reverse;

pub fn warshall_floyd<
    N,
    E,
    Ty: EdgeType,
    Ix: IndexType,
    F: Fn(EdgeIndex<Ix>, &Graph<N, E, Ty, Ix>) -> usize,
>(
    graph: &Graph<N, E, Ty, Ix>,
    edge_distance: F,
) -> Vec<Vec<Option<usize>>> {
    let n = graph.node_count();
    let mut distance = vec![vec![None; n]; n];
    for i in 0..n {
        distance[i][i] = Some(0);
    }
    for e in graph.edge_indices() {
        let (u, v) = graph.edge_endpoints(e).unwrap();
        let i = u.index();
        let j = v.index();
        let d = edge_distance(e, graph);
        distance[i][j] = Some(d);
        distance[j][i] = Some(d);
    }
    for k in 0..n {
        for i in 0..n {
            for j in 0..n {
                if let (Some(d2), Some(d3)) = (distance[i][k], distance[k][j]) {
                    if let Some(d1) = distance[i][j] {
                        if d2 + d3 < d1 {
                            distance[i][j] = Some(d2 + d3);
                        }
                    } else {
                        distance[i][j] = Some(d2 + d3);
                    }
                }
            }
        }
    }
    distance
}

pub fn component_count<N, E, Ty: EdgeType, Ix: IndexType>(graph: &Graph<N, E, Ty, Ix>) -> usize {
    let n = graph.node_count();
    let mut components = UnionFind::new(n);
    for e in graph.edge_indices() {
        let (u, v) = graph.edge_endpoints(e).unwrap();
        let i = u.index();
        let j = v.index();
        components.union(i, j);
    }
    let mut count = 0;
    for i in 0..n {
        if i == components.find(i) {
            count += 1;
        }
    }
    count
}

pub fn connected_components<N, E, Ty: EdgeType, Ix: IndexType>(
    graph: &Graph<N, E, Ty, Ix>,
) -> Vec<Vec<usize>> {
    let n = graph.node_count();
    let mut components = UnionFind::new(n);
    for e in graph.edge_indices() {
        let (u, v) = graph.edge_endpoints(e).unwrap();
        let i = u.index();
        let j = v.index();
        components.union(i, j);
    }
    let mut result = vec![vec![]; n];
    for i in 0..n {
        result[components.find(i)].push(i);
    }
    result.sort_by_key(|x| Reverse(x.len()));
    while result.len() > 0 && result[result.len() - 1].len() == 0 {
        result.pop();
    }
    result
}

pub fn triangles<N, E, Ty: EdgeType, Ix: IndexType>(graph: &Graph<N, E, Ty, Ix>) -> Vec<usize> {
    let matrix = graph.adjacency_matrix();
    graph
        .node_indices()
        .map(|u| {
            let mut count = 0;
            let neighbors = graph.neighbors_undirected(u).collect::<Vec<_>>();
            let m = neighbors.len();
            for i in 1..m {
                for j in 0..i {
                    if graph.is_adjacent(&matrix, neighbors[i], neighbors[j]) {
                        count += 1;
                    }
                }
            }
            count
        })
        .collect::<Vec<_>>()
}

pub fn is_graphical(degrees: &Vec<usize>) -> bool {
    let mut degrees = degrees.iter().map(|&d| d as isize).collect::<Vec<_>>();
    degrees.sort();
    degrees.reverse();
    let n = degrees.len();
    for i in 0..n {
        if degrees[i] < 0 || i + degrees[i] as usize >= n {
            return false;
        }
        for j in 1..=degrees[i] as usize {
            degrees[i + j] -= 1;
        }
        for j in (1..=degrees[i] as usize).rev() {
            for k in j + 1..n {
                if degrees[k - 1] >= degrees[k] {
                    break;
                }
                degrees.swap(k - 1, k);
            }
        }
    }
    return true;
}
