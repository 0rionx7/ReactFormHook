import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import DonePage from "./DonePage";
import Register, { type FormInput } from "./Register";

function App() {
  const [enteredValues, setEnteredValues] = useState<FormInput>({
    name: "",
    email: "",
    agree: false,
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Register
                enteredValues={enteredValues}
                setEnteredValues={setEnteredValues}
              />
            }
          />
          <Route
            path="/done"
            element={<DonePage enteredValues={enteredValues} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
