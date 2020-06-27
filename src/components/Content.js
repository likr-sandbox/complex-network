import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonRange,
  IonRow,
} from "@ionic/react";
import NetworkChart from "./NetworkChart";
import DegreeDistributionChart from "./DegreeDistributionChart";
import InfectionChart from "./InfectionChart";
import slice from "./slice";

const Content = () => {
  const dispatch = useDispatch();
  const states = useSelector(({ states }) => states);
  const step = useSelector(({ step }) => step);

  return (
    <>
      <IonList>
        <IonItem>
          <IonLabel position="stacked">Step</IonLabel>
          <IonRange
            min="0"
            max={states.length - 1}
            value={step}
            disabled={states.length === 0}
            debounce="100"
            onIonChange={(event) => {
              dispatch(slice.actions.setStep(+event.target.value));
            }}
          />
        </IonItem>
        <IonItem>
          <NetworkChart />
        </IonItem>
      </IonList>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <DegreeDistributionChart />
          </IonCol>
          <IonCol size="6">
            <InfectionChart />
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default Content;
