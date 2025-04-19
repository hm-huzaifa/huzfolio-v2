import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { memo, useRef, useMemo } from 'react';
import * as THREE from 'three';

const BackgroundObject = memo(() => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);

  // Create particles that orbit around a point
  const particles = useMemo(() => {
    return [...Array(20)].map((_, i) => {
      // Create particles in a spherical distribution
      const phi = Math.acos(-1 + (2 * i) / 20);
      const theta = Math.sqrt(20 * Math.PI) * phi;
      
      // Position on a sphere
      const x = Math.cos(theta) * Math.sin(phi) * (2 + Math.random() * 0.5);
      const y = Math.sin(theta) * Math.sin(phi) * (2 + Math.random() * 0.5);
      const z = Math.cos(phi) * (2 + Math.random() * 0.5);
      
      return {
        position: [x, y, z] as [number, number, number],
        size: 0.05 + Math.random() * 0.05,
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2
      };
    });
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || !particlesRef.current) return;

    const t = clock.getElapsedTime();

    // Gentle rotation for the entire group
    groupRef.current.rotation.y = t * 0.1;

    // Animate particles
    if (particlesRef.current.children.length > 0) {
      particlesRef.current.children.forEach((particle, i) => {
        const data = particles[i];
        
        // Orbital motion around original position
        const orbitRadius = 0.2;
        const orbitSpeed = data.speed;
        const particleT = t * orbitSpeed + data.offset;
        
        particle.position.x = data.position[0] + Math.cos(particleT) * orbitRadius;
        particle.position.y = data.position[1] + Math.sin(particleT) * orbitRadius;
        particle.position.z = data.position[2] + Math.cos(particleT * 0.5) * orbitRadius;
        
        // Pulse size
        const pulseFactor = 0.8 + Math.sin(t * 0.6 + i * 0.3) * 0.2;
        particle.scale.set(pulseFactor, pulseFactor, pulseFactor);
        
        // Opacity animation
        const material = (particle as THREE.Mesh).material as THREE.MeshBasicMaterial;
        material.opacity = 0.4 + Math.sin(t * 0.5 + i * 0.2) * 0.3;
      });
    }
  });

  return (
    <Float 
      speed={1} 
      rotationIntensity={0.2} 
      floatIntensity={0.3}
    >
      <group ref={groupRef}>
        {/* Particles */}
        <group ref={particlesRef}>
          {particles.map((particle, i) => (
            <mesh 
              key={`particle-${i}`} 
              position={particle.position}
            >
              <sphereGeometry args={[particle.size, 12, 12]} />
              <meshBasicMaterial
                color={i % 3 === 0 ? "#0891b2" : (i % 3 === 1 ? "#06b6d4" : "#0e7490")}
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
});

BackgroundObject.displayName = 'BackgroundObject';

const AboutBackground3D = memo(() => {
  return (
    <div className="fixed inset-0 opacity-50 z-0">
      <Canvas 
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={false}
          autoRotate 
          autoRotateSpeed={0.2}
        />
        <BackgroundObject />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
      </Canvas>
    </div>
  );
});

AboutBackground3D.displayName = 'AboutBackground3D';
export default AboutBackground3D;