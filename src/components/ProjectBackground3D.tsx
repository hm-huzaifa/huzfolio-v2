import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
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
        {/* Main shape */}
        <mesh>
          <icosahedronGeometry args={[2.5, 1]} />
          <meshBasicMaterial 
            color="#0891b2" 
            wireframe 
            transparent 
            opacity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
});

BackgroundObject.displayName = 'BackgroundObject';

const ProjectBackground3D = memo(() => {
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
        <BackgroundObject />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
});

ProjectBackground3D.displayName = 'ProjectBackground3D';
export default ProjectBackground3D; 