import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { memo, useRef } from 'react';
import * as THREE from 'three';

const BackgroundObject = memo(() => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={1}
    >
      <group ref={groupRef}>
        {/* Main dodecahedron - represents multi-faceted skills */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <dodecahedronGeometry args={[2.5, 0]} />
          <meshBasicMaterial 
            color="#0891b2" 
            wireframe 
            transparent 
            opacity={0.6}
          />
        </mesh>

        {/* Inner sphere - represents core competencies */}
        <mesh>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshBasicMaterial 
            color="#0891b2" 
            wireframe 
            transparent 
            opacity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
});

BackgroundObject.displayName = 'BackgroundObject';

const SkillsBackground3D = memo(() => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 10] }}
      >
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={false}
          autoRotate 
          autoRotateSpeed={0.2} 
        />
        <Stars 
          radius={300} 
          depth={50} 
          count={3000}
          factor={4} 
          saturation={0.5} 
          fade 
          speed={0.5} 
        />
        <BackgroundObject />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
});

SkillsBackground3D.displayName = 'SkillsBackground3D';
export default SkillsBackground3D; 