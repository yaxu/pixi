import { useApp } from "@pixi/react";
import { useEffect } from "react";
import run from "./texture";

export default function PixiApp() {
  let app = useApp();
  useEffect(() => {
    app.stage.removeChildren();
    run(app);
  }, [app]);

  return <></>;
}
