import { CameraControls, Gltf, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
import { Godray } from "./Godray";

export const Experience = () => {
  const controls = useThree((state) => state.controls);

  const animate = async () => {
    controls.setLookAt(0, 0.5, -5, 0, 1.5, -2);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    controls.smoothTime = 0.8;
    await controls.setLookAt(5, 2, -5, 0, 2, -2, true);
    controls.smoothTime = 0.4;
    await controls.setLookAt(-5, 0.5, 5, -1, 2, -2, true);
  };

  useEffect(() => {
    if (!controls) {
      return;
    }
    animate();
  }, [controls]);

  return (
    <>
      <CameraControls
        makeDefault
        maxDistance={8}
        minDistance={1}
        minPolarAngle={0}
        maxPolarAngle={degToRad(110)}
      />
      <Godray
        debug
        settings={{
          position: [
            0.30000000000000004, 4.899999999999998, -6.700000000000005,
          ],
          rotation: [-0.6781317007977318, 0, 0],
          color: "#c7b99c",
          topRadius: 1.7,
          bottomRadius: 2,
          height: 14.5,
          timeSpeed: 0.07999999999999999,
          noiseScale: 4.4,
          smoothBottom: 0.332,
          smoothTop: 0.574,
          fresnelPower: 2.9,
        }}
      />
      <Gltf src="models/godray.glb" position-y={-1} />
      <ambientLight intensity={1} />
    </>
  );
};

useGLTF.preload("models/godray.glb");
