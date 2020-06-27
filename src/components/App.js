import React from "react";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
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
  middleware: getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
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
