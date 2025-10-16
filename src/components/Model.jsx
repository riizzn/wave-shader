import { useControls } from "leva";
import React, { useRef } from "react";
import { fragment, vertex } from "./shader";
import { useFrame, useThree } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import * as THREE from "three";

import gsap from "gsap";

const Model = ({ scrollProgress }) => {
  const plane = useRef();

  const texture = useTexture("/images/distort.jpg");
  const { width, height } = texture.image;
  const scale = useAspect(width, height, 0.3);
  const { viewport } = useThree();

  const { amplitude, waveLength } = useControls({
    amplitude: { value: 0.45, min: 0, max: 5, step: 0.05 },
    waveLength: { value: 5, min: 0, max: 20, step: 1 },
  });
  const uniforms = useRef({
    vUvScale: { value: new THREE.Vector2(0, 0) },
    uTexture: { value: texture },
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
  });
  useFrame(() => {
    const scaleX = gsap.utils.interpolate(
      scale[0],
      viewport.width,
      scrollProgress
    );

    const scaleY = gsap.utils.interpolate(
      scale[1],
      viewport.height,
      scrollProgress
    );
    plane.current.scale.x = scaleX;
    plane.current.scale.y = scaleY;

    const scaleRatio = scaleX / scaleY;
    const aspectRatio = width / height;
    plane.current.material.uniforms.vUvScale.value.set(
      1,
      aspectRatio / scaleRatio
    );
    plane.current.material.uniforms.uTime.value += 0.045;

    const modifiedAmplitude = gsap.utils.interpolate(
      amplitude,
      0,
      scrollProgress
    );
    plane.current.material.uniforms.uWaveLength.value = waveLength;
    plane.current.material.uniforms.uAmplitude.value = modifiedAmplitude;
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
