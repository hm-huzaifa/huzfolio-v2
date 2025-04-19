import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { memo, useRef } from 'react';
import * as THREE from 'three';

const ParticleGrid = memo(() => {
  const particlesRef = useRef<THREE.Points>(null);
  const particles = 50;
  
  // Create points for the grid
  const positions = new Float32Array(particles * particles * 3);
  const scales = new Float32Array(particles * particles);
  
  for (let i = 0; i < particles; i++) {
    for (let j = 0; j < particles; j++) {
      const index = i * particles + j;
      
      positions[index * 3] = (i - particles / 2) * 0.5;
      positions[index * 3 + 1] = (j - particles / 2) * 0.5;
      positions[index * 3 + 2] = 0;
      
      scales[index] = Math.random() * 0.8 + 0.2;
    }
  }
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const elapsed = clock.getElapsedTime();
      
      // Animate particles
      for (let i = 0; i < particles * particles; i++) {
        const i3 = i * 3;
        positions[i3 + 2] = Math.sin((i % particles) * 0.1 + elapsed) * 2 +
                            Math.cos((Math.floor(i / particles)) * 0.1 + elapsed) * 2;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        color="#06b6d4"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
});

ParticleGrid.displayName = 'ParticleGrid';

const ExperienceBackground3D = memo(() => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 20], fov: 75 }}
      >
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5} 
        />
        <Stars 
          radius={100} 
          depth={50} 
          count={1000}
          factor={4} 
          saturation={0.5} 
          fade 
          speed={0.5} 
        />
        <ParticleGrid />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
});

ExperienceBackground3D.displayName = 'ExperienceBackground3D';
export default ExperienceBackground3D; 