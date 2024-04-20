"use client";

/* Core */
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

/* Instruments */
import { persistor, reduxStore } from "~/lib/redux";

const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
};
export default Providers;
