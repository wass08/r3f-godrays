import { button, useControls } from "leva";
import { useEffect, useRef } from "react";

export const GodrayBuilder = ({ settings, onChange }) => {
  const curControls = useRef({});
  const controls = useControls("Godray Settings", {
    position: {
      value: settings.position || [0, 0, 0],
      step: 0.1,
    },
    rotation: {
      value: settings.rotation || [0, 0, 0],
      step: 0.01,
    },
    color: {
      value: settings.color || "white",
    },
    topRadius: {
      value: settings.topRadius || 3,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    bottomRadius: {
      value: settings.bottomRadius || 2,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    height: {
      value: settings.height || 10,
      min: 0.1,
      max: 20,
      step: 0.1,
    },
    timeSpeed: {
      value: settings.timeSpeed || 0.1,
      min: 0,
      max: 2,
      step: 0.01,
    },
    noiseScale: {
      value: settings.noiseScale || 5,
      min: 0.1,
      max: 20,
      step: 0.1,
    },
    smoothBottom: {
      value: settings.smoothBottom || 0.1,
      min: 0,
      max: 1,
      step: 0.001,
    },
    smoothTop: {
      value: settings.smoothTop || 0.9,
      min: 0,
      max: 1,
      step: 0.001,
    },
    fresnelPower: {
      value: settings.fresnelPower || 5,
      min: 1,
      max: 10,
      step: 0.1,
    },
    "Export Settings": button(() => {
      const exportedSettings = {
        position: curControls.current.position,
        rotation: curControls.current.rotation,
        color: curControls.current.color,
        topRadius: curControls.current.topRadius,
        bottomRadius: curControls.current.bottomRadius,
        height: curControls.current.height,
        timeSpeed: curControls.current.timeSpeed,
        noiseScale: curControls.current.noiseScale,
        smoothBottom: curControls.current.smoothBottom,
        smoothTop: curControls.current.smoothTop,
        fresnelPower: curControls.current.fresnelPower,
      };
      console.log(
        "Godray Settings:",
        JSON.stringify(exportedSettings, null, 2)
      );
      navigator.clipboard?.writeText(JSON.stringify(exportedSettings, null, 2));
    }),
  });
  curControls.current = controls;

  useEffect(() => {
    onChange(controls);
  }, [controls, onChange]);

  return null;
};
