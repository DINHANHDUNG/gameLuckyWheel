import React, { useEffect, useState } from "react";
import "./App.css";
import Test from "./Game/test";

function App() {
  const [listPrize, setPrize] = useState({});

  useEffect(() => {
    renderWheel();
  }, []);

  function renderWheel() {
    setPrize({
      ...listPrize,
    });
  }

  return (
    <div className="App">
      <Test />
    </div>
  );
}

export default App;
