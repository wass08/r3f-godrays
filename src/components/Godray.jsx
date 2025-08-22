import { extend } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import {
  cameraPosition,
  color,
  dot,
  mx_worley_noise_float,
  normalLocal,
  normalWorld,
  positionWorld,
  smoothstep,
  time,
  uniform,
  uv,
  vec4,
} from "three/tsl";
import { MeshStandardNodeMaterial } from "three/webgpu";
import { GodrayBuilder } from "./GodrayBuilder";

extend({
  MeshStandardNodeMaterial,
});

export const Godray = ({ settings = {}, debug = false, ...props }) => {
  const [
    {
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      color: godrayColor = "white",
      timeSpeed = 0.1,
      noiseScale = 5,
      topRadius = 3,
      bottomRadius = 2,
      height = 10,
      smoothBottom = 0.1,
      smoothTop = 0.9,
      fresnelPower = 5,
    },
    setSettings,
  ] = useState(settings);

  const { nodes, uniforms } = useMemo(() => {
    const uniforms = {
      noiseScale: uniform(noiseScale),
      color: uniform(color(godrayColor)),
      timeSpeed: uniform(timeSpeed),
      smoothTop: uniform(smoothTop),
      smoothBottom: uniform(smoothBottom),
      fresnelPower: uniform(fresnelPower),
    };
    const customUV = normalLocal
      .mul(uniforms.noiseScale)
      .add(time.mul(uniforms.timeSpeed));
    const noise = mx_worley_noise_float(customUV);
    const smooth = smoothstep(0, uniforms.smoothBottom, uv().y).mul(
      smoothstep(1.001, uniforms.smoothTop, uv().y)
    );

    const viewDirection = cameraPosition.sub(positionWorld).normalize();
    const invertedFresnel = dot(normalWorld, viewDirection)
      .abs()
      .pow(uniforms.fresnelPower);

    const alpha = noise.mul(invertedFresnel).mul(smooth);

    return {
      nodes: {
        colorNode: vec4(0, 0, 0, alpha),
        emissiveNode: uniforms.color,
      },
      uniforms,
    };
  }, []);

  useEffect(() => {
    uniforms.noiseScale.value = noiseScale;
    uniforms.timeSpeed.value = timeSpeed;
    uniforms.smoothTop.value = smoothTop;
    uniforms.smoothBottom.value = smoothBottom;
    uniforms.fresnelPower.value = fresnelPower;
    if (godrayColor) {
      uniforms.color.value.set(godrayColor);
    }
  }, [
    noiseScale,
    godrayColor,
    timeSpeed,
    smoothTop,
    smoothBottom,
    fresnelPower,
  ]);

  return (
    <>
      {debug && <GodrayBuilder settings={settings} onChange={setSettings} />}
      <mesh {...props} position={position} rotation={rotation}>
        <cylinderGeometry
          args={[topRadius, bottomRadius, height, 64, 1, true]}
        />
        <meshStandardNodeMaterial {...nodes} transparent />
      </mesh>
    </>
  );
};
