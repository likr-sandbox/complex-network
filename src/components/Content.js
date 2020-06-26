import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IonItem, IonList, IonRange } from "@ionic/react";
import NetworkChart from "./NetworkChart";
import DegreeDistributionChart from "./DegreeDistributionChart";
import slice from "./slice";

const Content = () => {
  const dispatch = useDispatch();
  const states = useSelector(({ states }) => states);
  const step = useSelector(({ step }) => step);

  return (
    <IonList>
      <IonItem>
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
      <IonItem>
        <DegreeDistributionChart />
      </IonItem>
    </IonList>
  );
};

export default Content;
