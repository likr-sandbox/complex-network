import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    graphPtr: null,
    states: [],
    step: 0,
  },
  reducers: {
    setGraph(state, action) {
      return Object.assign({}, state, {
        graphPtr: action.payload,
        state: [],
        step: 0,
      });
    },
    setStates(state, action) {
      return Object.assign({}, state, {
        states: action.payload,
        step: 0,
      });
    },
    setStep(state, action) {
      return Object.assign({}, state, {
        step: action.payload,
      });
    },
  },
});

export default slice;
