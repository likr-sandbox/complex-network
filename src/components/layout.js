import worker from "./layout.worker";

const mod = worker();

export const layout = (data) => {
  return mod.layout(data);
};
