import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { memo, useRef, useMemo } from 'react';
import * as THREE from 'three';

const ContactObject = memo(() => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Pre-calculate angles and positions for connection points
  const connectionPoints = useMemo(() => {
    return [...Array(8)].map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 6;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 2,
          Math.sin(angle) * radius
        ] as [number, number, number]
      };
    });
  }, []);

  // Pre-calculate orbital ring rotations
  const orbitalRings = useMemo(() => {
    return [0, 1, 2].map((i) => ({
      rotation: [Math.PI / (i + 2), Math.PI / 3 * i, 0] as [number, number, number],
      radius: 4 + i * 2
    }));
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Reduced animation complexity
      const t = clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.y = t; // Only spinning on the y-axis
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central sphere - reduced segments */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 12, 12]} />
        <meshBasicMaterial
          color="#0891b2"
          wireframe={true}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbital rings - reduced segments */}
      {orbitalRings.map((ring, i) => (
        <mesh 
          key={i} 
          rotation={ring.rotation}
        >
          <torusGeometry args={[ring.radius, 0.1, 8, 32]} />
          <meshBasicMaterial
            color="#0891b2"
            wireframe={true}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}

      {/* Connection points - reduced segments */}
      {connectionPoints.map((point, i) => (
        <mesh 
          key={i}
          position={point.position}
        >
          <sphereGeometry args={[0.3, 6, 6]} />
          <meshBasicMaterial
            color="#0891b2"
            wireframe={true}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
});

ContactObject.displayName = 'ContactObject';

const ContactBackground3D = memo(() => {
  return (
    <div className="fixed inset-0 opacity-50 z-0">
      <Canvas 
        camera={{ position: [0, 0, 25], fov: 45 }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        performance={{ min: 0.5 }}
      >
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={false}
          autoRotate 
          autoRotateSpeed={0.1}
        />
        <ContactObject />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
      </Canvas>
    </div>
  );
});

ContactBackground3D.displayName = 'ContactBackground3D';
export default ContactBackground3D;