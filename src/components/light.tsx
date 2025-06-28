import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group } from "three"

  function Light() {
  const ref = useRef < Group | null> (null)
  useFrame((_) => (ref.current!.rotation.x = _.clock.elapsedTime))
  return (
    <group ref={ref}>
      <rectAreaLight width={15} height={100} position={[30, 30, -10]} intensity={5} onUpdate={(self) => self.lookAt(0, 0, 0)} />
    </group>
  )
}

export default Light