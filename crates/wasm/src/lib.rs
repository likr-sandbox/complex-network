#[macro_use]
extern crate serde_derive;

pub mod algorithm;
pub mod centrality;
pub mod graph_generation;

use js_sys::{Array, Function, Object, Reflect};
use petgraph::graph::{edge_index, node_index};
use petgraph::prelude::*;
use rand::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = Graph)]
pub struct JsGraph {
    graph: Graph<JsValue, JsValue>,
}

#[wasm_bindgen(js_class = Graph)]
impl JsGraph {
    #[wasm_bindgen(constructor)]
    pub fn new() -> JsGraph {
        let graph = Graph::new();
        JsGraph { graph }
    }

    #[wasm_bindgen(js_name = nodeCount)]
    pub fn node_count(&self) -> usize {
        self.graph.node_count()
    }

    #[wasm_bindgen(js_name = edgeCount)]
    pub fn edge_count(&self) -> usize {
        self.graph.edge_count()
    }

    #[wasm_bindgen(js_name = addNode)]
    pub fn add_node(&mut self, weight: JsValue) -> usize {
        let u = self.graph.add_node(weight);
        u.index()
    }

    #[wasm_bindgen(js_name = addEdge)]
    pub fn add_edge(&mut self, a: usize, b: usize, weight: JsValue) -> usize {
        let e = self.graph.add_edge(node_index(a), node_index(b), weight);
        e.index()
    }

    #[wasm_bindgen(js_name = nodeWeight)]
    pub fn node_weight(&self, a: usize) -> Result<JsValue, JsValue> {
        self.graph
            .node_weight(node_index(a))
            .map(|w| w.clone())
            .ok_or("error".into())
    }

    #[wasm_bindgen(js_name = edgeWeight)]
    pub fn edge_weight(&self, a: usize) -> Result<JsValue, JsValue> {
        self.graph
            .edge_weight(edge_index(a))
            .map(|w| w.clone())
            .ok_or("error".into())
    }

    #[wasm_bindgen(js_name = toJSON)]
    pub fn to_json(&self) -> JsValue {
        let obj = Object::new();
        Reflect::set(&obj, &"nodes".into(), &self.nodes()).unwrap();
        Reflect::set(&obj, &"links".into(), &self.edges()).unwrap();
        obj.into()
    }

    pub fn nodes(&self) -> JsValue {
        let array = Array::new();
        for u in self.graph.node_indices() {
            let obj = Object::new();
            Reflect::set(&obj, &"id".into(), &(u.index() as u32).into()).unwrap();
            Reflect::set(&obj, &"weight".into(), &self.graph[u]).unwrap();
            array.push(&obj);
        }
        array.into()
    }

    pub fn edges(&self) -> JsValue {
        let array = Array::new();
        for e in self.graph.edge_indices() {
            let (u, v) = self.graph.edge_endpoints(e).unwrap();
            let obj = Object::new();
            Reflect::set(&obj, &"source".into(), &(u.index() as u32).into()).unwrap();
            Reflect::set(&obj, &"target".into(), &(v.index() as u32).into()).unwrap();
            Reflect::set(&obj, &"weight".into(), &self.graph[e]).unwrap();
            array.push(&obj);
        }
        array.into()
    }
}

#[wasm_bindgen]
pub fn diameter(graph: &JsGraph, edge_distance: &Function) -> usize {
    let distance = self::algorithm::warshall_floyd(&graph.graph, |e, _| {
        let this = JsValue::NULL;
        edge_distance
            .call1(&this, &(e.index() as u32).into())
            .unwrap()
            .as_f64()
            .unwrap() as usize
    });
    let n = graph.graph.node_count();
    (0..n)
        .max_by_key(|&i| (0..n).max_by_key(|&j| distance[i][j]).unwrap())
        .unwrap()
}

#[wasm_bindgen(js_name = randomGraph)]
pub fn random_graph(n: usize, p: f64, seed: usize) -> JsGraph {
    let mut rng = StdRng::seed_from_u64(seed as u64);
    JsGraph {
        graph: self::graph_generation::random_graph(
            n,
            p,
            &mut rng,
            |_| Object::new().into(),
            |_, _| Object::new().into(),
        ),
    }
}

#[wasm_bindgen(js_name = randomTree)]
pub fn random_tree(n: usize, seed: usize) -> JsGraph {
    let mut rng = StdRng::seed_from_u64(seed as u64);
    JsGraph {
        graph: self::graph_generation::random_tree(
            n,
            &mut rng,
            |_| Object::new().into(),
            |_, _| Object::new().into(),
        ),
    }
}

#[wasm_bindgen(js_name = randomScaleFreeGraph)]
pub fn random_scale_free_graph(n: usize, c: f64, gamma: f64, seed: usize) -> JsGraph {
    let mut rng = StdRng::seed_from_u64(seed as u64);
    JsGraph {
        graph: self::graph_generation::random_scale_free_graph(
            n,
            c,
            gamma,
            &mut rng,
            |_| Object::new().into(),
            |_, _| Object::new().into(),
        ),
    }
}

#[wasm_bindgen(js_name = configurationModel)]
pub fn configuration_model(degrees: JsValue, seed: usize) -> Result<JsGraph, JsValue> {
    let degrees = degrees.into_serde::<Vec<usize>>().unwrap();
    let mut rng = StdRng::seed_from_u64(seed as u64);
    self::graph_generation::configuration_model(
        &degrees,
        &mut rng,
        |_| Object::new().into(),
        |_, _| Object::new().into(),
    )
    .map(|graph| JsGraph { graph })
    .map_err(|e| e.into())
}

#[wasm_bindgen(js_name = componentCount)]
pub fn component_count(graph: &JsGraph) -> usize {
    self::algorithm::component_count(&graph.graph)
}

#[wasm_bindgen]
pub fn triangles(graph: &JsGraph) -> JsValue {
    JsValue::from_serde(&self::algorithm::triangles(&graph.graph)).unwrap()
}

#[wasm_bindgen(js_name = degreeCentrality)]
pub fn degree_centrality(graph: &JsGraph) -> JsValue {
    JsValue::from_serde(&self::centrality::degree_centrality(&graph.graph)).unwrap()
}

#[wasm_bindgen(js_name = closenessCentrality)]
pub fn closeness_centrality(graph: &JsGraph) -> JsValue {
    JsValue::from_serde(&self::centrality::closeness_centrality(&graph.graph)).unwrap()
}

#[wasm_bindgen]
pub fn pagerank(graph: &JsGraph, d: f64, iter: usize) -> JsValue {
    JsValue::from_serde(&self::centrality::pagerank(&graph.graph, d, iter)).unwrap()
}

#[derive(Serialize)]
pub struct HistogramItem {
    pub x0: f64,
    pub x1: f64,
    pub y: usize,
}

#[wasm_bindgen]
pub fn histogram(x: JsValue, bins: usize, min_x: f64, max_x: f64) -> JsValue {
    let x = x.into_serde::<Vec<f64>>().unwrap();
    let dx = (max_x - min_x) / bins as f64;
    let mut count = (0..bins)
        .map(|i| {
            let i = i as f64;
            HistogramItem {
                x0: dx * i + min_x,
                x1: dx * (i + 1.) + min_x,
                y: 0,
            }
        })
        .collect::<Vec<_>>();
    for &xi in &x {
        if xi < min_x || max_x <= xi {
            continue;
        }
        let k = ((xi - min_x) / dx) as usize;
        count[k].y += 1;
    }
    JsValue::from_serde(&count).unwrap()
}
