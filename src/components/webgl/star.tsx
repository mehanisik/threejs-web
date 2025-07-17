import { useRef } from "react";
import { useLayoutEffect } from "react";
import { degreesToRadians, mix } from "popmotion";
import type { Mesh } from "three";

export const Star = ({
  p,
  color = "#ffffff",
}: {
  p: number;
  color?: string;
}) => {
  const ref = useRef<Mesh>(null);

  useLayoutEffect(() => {
    const distance = mix(2, 3.5, Math.random());
    const yAngle = mix(
      degreesToRadians(80),
      degreesToRadians(100),
      Math.random(),
    );
    const xAngle = degreesToRadians(360) * p;
    ref.current!.position.setFromSphericalCoords(distance, yAngle, xAngle);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial wireframe color={color} />
    </mesh>
  );
};
