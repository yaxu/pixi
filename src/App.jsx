import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Stage } from "@pixi/react";
import PixiApp from "./pixi";

function App() {
  return (
    <>
      <h1>Strudel texture</h1>
      <Stage width={800} height={500}>
        <PixiApp />
      </Stage>
    </>
  );
}

export default App;
