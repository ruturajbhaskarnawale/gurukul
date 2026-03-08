"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, ContactShadows } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function NeuralCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;

      // Mouse following parallax
      const targetX = pointer.x * 0.5;
      const targetY = pointer.y * 0.5;
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.1;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1;

      // Subtle pulse
      const time = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(time * 0.5) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 15]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={128}
          transmission={0.3}
          roughness={0}
          thickness={2}
          ior={1.5}
          chromaticAberration={0.1}
          anisotropy={0.1}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.5}
          clearcoat={1}
          attenuationDistance={1}
          attenuationColor="#ffffff"
          color="#3b82f6"
        />
      </mesh>
    </Float>
  );
}

function MagneticParticles({ count = 3000 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer, viewport } = useThree();

  // Create initial positions and velocity buffers
  const [positions, initialPositions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initial = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 0.5;
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
      const distToOrigin = currentPos.distanceTo(origin);
      const springForce = origin.clone().sub(currentPos).multiplyScalar(0.02);
      
      // 2. Magnetic Repulsion
      const distToMouse = currentPos.distanceTo(mousePos);
      let repulsionForce = new THREE.Vector3(0, 0, 0);
      if (distToMouse < 2) {
        repulsionForce = currentPos.clone().sub(mousePos).normalize().multiplyScalar(0.2 * (1 - distToMouse / 2));
      }

      // 3. Subtle floating noise
      const noise = new THREE.Vector3(
        Math.sin(time * 0.5 + i) * 0.002,
        Math.cos(time * 0.4 + i) * 0.002,
        Math.sin(time * 0.3 + i) * 0.002
      );

      // Update velocity and position
      velocities[i3] = (velocities[i3] + springForce.x + repulsionForce.x + noise.x) * 0.9;
      velocities[i3 + 1] = (velocities[i3 + 1] + springForce.y + repulsionForce.y + noise.y) * 0.9;
      velocities[i3 + 2] = (velocities[i3 + 2] + springForce.z + repulsionForce.z + noise.z) * 0.9;

      attr.array[i3] += velocities[i3];
      attr.array[i3 + 1] += velocities[i3 + 1];
      attr.array[i3 + 2] += velocities[i3 + 2];
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
        size={0.012}
        color="#3b82f6"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Environment preset="night" />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1.5} />
        <NeuralCore />
        <MagneticParticles />
        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.8} 
          scale={20} 
          blur={2.5} 
          far={5} 
        />
      </Canvas>
    </div>
  );
}
