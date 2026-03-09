"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, ContactShadows } from "@react-three/drei";
import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

interface Hero3DProps {
  scrollProgress: MotionValue<number>;
}

function NeuralCore({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (meshRef.current) {
      const sp = scrollProgress.get();
      // Base rotation + scroll influence
      meshRef.current.rotation.x += delta * 0.4 + sp * 0.1;
      meshRef.current.rotation.y += delta * 0.6 + sp * 0.15;

      // Mouse following parallax
      const targetX = pointer.x * 0.5;
      const targetY = pointer.y * 0.5;
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.1;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1;

      // Vertical shift based on scroll
      meshRef.current.position.y -= sp * 2.5;

      // Subtle pulse
      const time = state.clock.getElapsedTime();
      const scale = 1.2 + Math.sin(time * 0.8) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 2]} />
        <meshPhysicalMaterial
          color="#3b82f6"
          metalness={0.9}
          roughness={0.1}
          reflectivity={1}
          clearcoat={1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function MagneticParticles({ count = 800, scrollProgress }: { count?: number; scrollProgress: MotionValue<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer, viewport } = useThree();

  // Create initial positions and velocity buffers
  const [positions, initialPositions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initial = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 2;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      pos.set([x, y, z], i * 3);
      initial.set([x, y, z], i * 3);
      vel.set([0, 0, 0], i * 3);
    }
    return [pos, initial, vel];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const time = state.clock.getElapsedTime();
    const sp = scrollProgress.get();
    
    // Project pointer to 3D space (approximate)
    const mx = (pointer.x * viewport.width) / 2;
    const my = (pointer.y * viewport.height) / 2;
    const mousePos = new THREE.Vector3(mx, my, 0);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const px = attr.array[i3];
      const py = attr.array[i3 + 1];
      const pz = attr.array[i3 + 2];

      const currentPos = new THREE.Vector3(px, py, pz);
      const origin = new THREE.Vector3(initialPositions[i3], initialPositions[i3 + 1], initialPositions[i3 + 2]);
      
      // 1. Return to origin force (Spring)
      const springForce = origin.clone().sub(currentPos).multiplyScalar(0.02);
      
      // 2. Magnetic Repulsion
      const distToMouse = currentPos.distanceTo(mousePos);
      let repulsionForce = new THREE.Vector3(0, 0, 0);
      if (distToMouse < 1.5) {
        repulsionForce = currentPos.clone().sub(mousePos).normalize().multiplyScalar(0.15 * (1 - distToMouse / 1.5));
      }

      // 3. Subtle floating noise + scroll vertical shift
      const noise = new THREE.Vector3(
        Math.sin(time * 0.3 + i) * 0.003,
        Math.cos(time * 0.2 + i) * 0.003,
        Math.sin(time * 0.1 + i) * 0.003
      );

      // Update velocity and position
      velocities[i3] = (velocities[i3] + springForce.x + repulsionForce.x + noise.x) * 0.95;
      velocities[i3 + 1] = (velocities[i3 + 1] + springForce.y + repulsionForce.y + noise.y) * 0.95;
      velocities[i3 + 2] = (velocities[i3 + 2] + springForce.z + repulsionForce.z + noise.z) * 0.95;

      attr.array[i3] += velocities[i3];
      attr.array[i3 + 1] += velocities[i3 + 1];
      attr.array[i3 + 2] += velocities[i3 + 2];

      // Global scroll influence on particle field
      attr.array[i3 + 1] -= sp * 0.08;
    }
    
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function Hero3D({ scrollProgress }: Hero3DProps) {
  const [isInView, setIsInView] = React.useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      {isInView && (
        <Canvas 
          key="hero-canvas"
          camera={{ position: [0, 0, 5], fov: 45 }} 
          dpr={[1, 2]}
          gl={{ 
            antialias: true, 
            alpha: true, 
            powerPreference: "high-performance",
            preserveDrawingBuffer: true
          }}
          onCreated={({ gl }) => {
            console.log("Hero3D Canvas Created", gl.getContext());
          }}
        >
          <Environment preset="night" />
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <pointLight position={[-10, -10, -10]} intensity={1.5} />
          <NeuralCore scrollProgress={scrollProgress} />
          <MagneticParticles scrollProgress={scrollProgress} />
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.8} 
            scale={20} 
            blur={2.5} 
            far={5} 
          />
        </Canvas>
      )}
    </div>
  );
}
