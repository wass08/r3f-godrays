import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

import { Loader } from "@react-three/drei";
import { Leva } from "leva";
import { Suspense, useState } from "react";
import { WebGPURenderer } from "three/webgpu";

function App() {
  const [frameloop, setFrameloop] = useState("never");
  return (
    <>
      <Leva collapsed />
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 75 }}
        frameloop={frameloop}
        flat
        gl={(canvas) => {
          const renderer = new WebGPURenderer({
            canvas,
            powerPreference: "high-performance",
            antialias: true,
            alpha: false,
            stencil: false,
            shadowMap: true,
          });
          renderer.init().then(() => {
            setFrameloop("always");
          });
          return renderer;
        }}
      >
        <color attach="background" args={["#333"]} />
        <Suspense>
          <Experience />
        </Suspense>
      </Canvas>
      <Loader />
      <a
        href="https://wawasensei.dev/courses/react-three-fiber"
        style={{
          position: "fixed",
          top: "0px",
          left: "16px",
          zIndex: 1000,
          dropShadow: "0 0 12px rgba(0,0,0,0.8)",
        }}
      >
        <img
          width="92"
          src="images/wawasensei-white.png"
          alt="Wawa Sensei White Logo"
        />
      </a>
    </>
  );
}

export default App;
