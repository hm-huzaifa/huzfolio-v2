import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { memo, useRef, useState } from 'react';
import * as THREE from 'three';

const BackgroundObject = memo(() => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0);

  useFrame(() => {
    if (!meshRef.current) return;

    // Animate scale
    setScale(prev => {
      const target = 1;
      return THREE.MathUtils.lerp(prev, target, 0.03);
    });

    // Animate opacity
    setOpacity(prev => {
      const target = 0.6;
      return THREE.MathUtils.lerp(prev, target, 0.03);
    });

    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[Math.PI / 4, 0, 0]}
      scale={0}
    >
      <torusGeometry args={[9, 2, 16, 50]} />
      <meshBasicMaterial 
        color="#0891b2" 
        wireframe 
        transparent 
        opacity={opacity}
      />
    </mesh>
  );
});

BackgroundObject.displayName = 'BackgroundObject';

const Background3D = memo(() => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 1] }}
      >
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={false}
          autoRotate 
          autoRotateSpeed={0.5} 
        />
        <Stars 
          radius={300} 
          depth={50} 
          count={1500}
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

Background3D.displayName = 'Background3D';
export default Background3D;