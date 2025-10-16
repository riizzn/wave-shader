import { useControls } from "leva";
import React, { useRef } from "react";
import { fragment, vertex } from "./shader";
import { useFrame } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";

const Model = () => {
  const plane = useRef();

  const texture = useTexture("/images/distort.jpg");
  const {width,height}=texture.image;
  const scale = useAspect( width , height,0.3);

  const { amplitude, waveLength } = useControls({
    amplitude: { value: 0.25, min: 0, max: 5, step: 0.05 },
    waveLength: { value: 5, min: 0, max: 20, step: 1 },
  });
  const uniforms = useRef({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
  });
  useFrame(() => {
    plane.current.material.uniforms.uTime.value += 0.045;

    plane.current.material.uniforms.uWaveLength.value = waveLength;
    plane.current.material.uniforms.uAmplitude.value = amplitude;
  });

  return (
    <mesh ref={plane} scale={scale}>
      <planeGeometry args={[1, 1, 45, 45]} />
      {/* <meshBasicMaterial color="red" wireframe={true} /> */}
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        wireframe={false}
        uniforms={uniforms.current}
      />
    </mesh>
  );
};

export default Model;
