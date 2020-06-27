import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import {
  Graph,
  connectedComponents,
  randomScaleFreeGraph,
  siModel,
  subgraph,
} from "./graph";
import slice from "./slice";

const startSimulation = async (graph, steps, p) => {
  const states = [];
  const n = await graph.nodeCount();
  const state = Array.from({ length: n }).map(() => false);
  for (let i = 0; i < n; ++i) {
    if (Math.random() < p) {
      state[i] = true;
    }
  }
  states.push(state);
  for (let i = 0; i < steps; ++i) {
    states.push(await siModel(graph, states[i], p));
  }
  return states;
};

const GraphGenerationForm = () => {
  const dispatch = useDispatch();

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Graph Generation</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const n = +event.target.elements.n.value;
            const gamma = +event.target.elements.gamma.value;
            const graph = await randomScaleFreeGraph(n, 1, gamma);
            const components = await connectedComponents(graph);
            const sub = await subgraph(graph, components[0]);
            dispatch(slice.actions.setGraph(sub.ptr));
          }}
        >
          <IonList>
            <IonItem>
              <IonLabel position="stacked">N</IonLabel>
              <IonInput
                name="n"
                type="number"
                value="500"
                min="0"
                step="100"
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">γ</IonLabel>
              <IonInput
                name="gamma"
                type="number"
                value="2"
                min="0"
                step="0.1"
                required
              />
            </IonItem>
          </IonList>
          <IonButton expand="full" type="submit">
            Generate
          </IonButton>
        </form>
      </IonCardContent>
    </IonCard>
  );
};

const SimulationForm = () => {
  const dispatch = useDispatch();
  const graphPtr = useSelector(({ graphPtr }) => graphPtr);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Simulation</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (graphPtr) {
              const graph = new Graph(graphPtr);
              const steps = +event.target.elements.steps.value;
              const p = +event.target.elements.p.value;
              const states = await startSimulation(graph, steps, p);
              dispatch(slice.actions.setStates(states));
            }
          }}
        >
          <IonList>
            <IonItem>
              <IonLabel position="stacked">steps</IonLabel>
              <IonInput
                name="steps"
                type="number"
                value="1000"
                min="0"
                step="100"
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">p</IonLabel>
              <IonInput
                name="p"
                type="number"
                value="0.01"
                min="0"
                max="1"
                step="0.01"
                required
              />
            </IonItem>
          </IonList>
          <IonButton expand="full" type="submit">
            Start
          </IonButton>
        </form>
      </IonCardContent>
    </IonCard>
  );
};

const Menu = () => {
  return (
    <>
      <GraphGenerationForm />
      <SimulationForm />
    </>
  );
};

export default Menu;
