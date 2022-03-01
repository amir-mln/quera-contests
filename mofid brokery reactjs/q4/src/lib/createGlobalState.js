import { createContext, useContext, useState } from "react";

export const createGlobalState = (callback) => {
  let contextName = "";
  const INITIAL_CONTEXT = callback(() => {});

  for (const key in INITIAL_CONTEXT) {
    if (Object.hasOwnProperty.call(INITIAL_CONTEXT, key)) {
      if (typeof INITIAL_CONTEXT[key] !== "function") {
        contextName = key;
      } else {
        delete INITIAL_CONTEXT[key];
      }
    }
  }

  const GlobalState = createContext(INITIAL_CONTEXT);

  GlobalState.displayName = contextName;

  function useGlobalState() {
    const globalState = useContext(GlobalState);

    if (Object.keys(globalState).length === 1)
      throw new Error(GlobalState.displayName);
    else return globalState;
  }

  function Provider({ children }) {
    const [state, setState] = useState(INITIAL_CONTEXT[contextName]);
    const value = { ...callback(setState), [contextName]: state };

    return (
      <GlobalState.Provider value={value}>{children}</GlobalState.Provider>
    );
  }

  return [Provider, useGlobalState];
};
