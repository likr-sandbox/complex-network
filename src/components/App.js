import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  IonApp,
  IonPage,
  IonSplitPane,
  IonMenu,
  IonContent,
} from "@ionic/react";

import Content from "./Content";
import Menu from "./Menu";
import slice from "./slice";

const store = configureStore({
  reducer: slice.reducer,
});

const App = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <IonSplitPane contentId="main">
          <IonMenu contentId="main" type="overlay">
            <IonContent>
              <Menu />
            </IonContent>
          </IonMenu>
          <IonPage id="main">
            <IonContent>
              <Content />
            </IonContent>
          </IonPage>
        </IonSplitPane>
      </IonApp>
    </Provider>
  );
};

export default App;
