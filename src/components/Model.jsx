import { useControls } from "leva";
import React, { useRef } from "react";
import { fragment, vertex } from "./shader";
import { useFrame } from "@react-three/fiber";

const Model = () => {
  const plane = useRef();
  const { amplitude, waveLength } = useControls({
    amplitude: { value: 0.25, min: 0, max: 5, step: 0.05 },
    waveLength: { value: 5, min: 0, max: 20, step: 1 },
  });
  const uniforms = useRef({
    uTime:{value:0},
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
  });
  useFrame(() => {
    plane.current.material.uniforms.uTime.value+=0.045

    plane.current.material.uniforms.uWaveLength.value = waveLength;
    plane.current.material.uniforms.uAmplitude.value = amplitude;
  });

  return (
    <mesh ref={plane}>
      <planeGeometry args={[3, 3, 50, 50]} />
      {/* <meshBasicMaterial color="red" wireframe={true} /> */}
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        wireframe={true}
        uniforms={uniforms.current}
      />
    </mesh>
  );
};

export default Model;
