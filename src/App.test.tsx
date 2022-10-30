import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import App from "./App";

test.skip("renders learn react link", () => {
   const { getByText } = render(
      <Provider store={store}>
         <App />
      </Provider>
   );

   // eslint-disable-next-line testing-library/prefer-screen-queries
   expect(getByText(/learn/i)).toBeInTheDocument();
});
