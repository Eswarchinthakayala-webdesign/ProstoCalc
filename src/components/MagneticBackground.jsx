import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SnowParticles = () => {
    const count = 3500; // Increased count for dense tiny snow
    const mesh = useRef();

    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        const velocities = new Float32Array(count);
        
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 60; 
            const y = (Math.random() - 0.5) * 60;
            const z = (Math.random() - 0.5) * 30; // Deeper field
            
            temp[i * 3] = x;
            temp[i * 3 + 1] = y;
            temp[i * 3 + 2] = z;

            velocities[i] = Math.random() * 0.015 + 0.005; 
        }
        return { positions: temp, velocities };
    }, []);

    useFrame(() => {
        if (!mesh.current) return;
        const positions = mesh.current.geometry.attributes.position.array;
        
        for (let i = 0; i < count; i++) {
            // Y update (falling)
            positions[i * 3 + 1] -= particles.velocities[i];

            // Subtle Wiggle
            positions[i * 3] += Math.sin(positions[i * 3 + 1] * 0.5) * 0.002;

            // Reset
            if (positions[i * 3 + 1] < -30) {
                positions[i * 3 + 1] = 30;
                positions[i * 3] = (Math.random() - 0.5) * 60;
            }
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;
    });

    const vertexShader = `
        void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            // Size attenuation: 
            // Creates tiny particles that get slightly larger when closer
            gl_PointSize = 35.0 / -mvPosition.z; 
            gl_Position = projectionMatrix * mvPosition;
        }
    `;

    const fragmentShader = `
        void main() {
            // Make it round
            float r = distance(gl_PointCoord, vec2(0.5));
            if (r > 0.5) discard;
            
            // White with transparency
            gl_FragColor = vec4(1.0, 1.0, 1.0, 0.7); 
        }
    `;

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <shaderMaterial
                transparent={true}
                depthWrite={false}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </points>
    );
};

const MagneticBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
           <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <SnowParticles />
            </Canvas>
        </div>
    );
};

export default MagneticBackground;
