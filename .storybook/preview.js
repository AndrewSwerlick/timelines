import { useEffect } from "react";
import { useChannel, useParameter } from "@storybook/api";
import { MemoryRouter } from "react-router-dom";
import { store } from "../src/app/store";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story, context) => {
    const setupFn = context.parameters.reduxSetupFn;
    useEffect(() => {
      if (store.dispatch && setupFn) {
        setupFn(store.dispatch);
      }
    }, [store.dispatch, setupFn]);
    return Story();
  },
  (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
];
