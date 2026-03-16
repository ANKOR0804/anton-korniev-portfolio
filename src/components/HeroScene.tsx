'use client';

import { Suspense, useRef, useEffect, useMemo } from 'react';
import { Group, Points, CanvasTexture, PointsMaterial } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, useGLTF } from '@react-three/drei';
import { useTheme } from 'next-themes';
import { useIsMounted } from '@/hooks/useIsMounted';

// Рисуем звезду на 2D canvas и возвращаем как Three.js текстуру
function createStarTexture(): CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size / 2;
  const cy = size / 2;
  const spikes = 5;
  const outerR = size / 2 - 2;
  const innerR = outerR * 0.45;

  ctx.clearRect(0, 0, size, size);
  ctx.beginPath();

  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i * Math.PI) / spikes - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }

  ctx.closePath();

  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerR);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.8)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = gradient;
  ctx.fill();

  return new CanvasTexture(canvas);
}

interface HeroSceneProps {
  className?: string;
}

interface ParticlesProps {
  isDark: boolean;
}

// Генерируем позиции один раз вне компонента — не пересчитываются при ре-рендере
const COUNT = 4000;
const positions = new Float32Array(COUNT * 3);
for (let i = 0; i < positions.length; i++) {
  positions[i] = (Math.random() - 0.5) * 120;
}

function Particles({ isDark }: ParticlesProps) {
  const ref = useRef<Points>(null);

  // Создаём текстуру один раз — только на клиенте (document доступен)
  const texture = useMemo(() => createStarTexture(), []);

  useEffect(() => {
    if (!ref.current) return;
    const mat = ref.current.material as PointsMaterial;
    mat.color.setHex(isDark ? 0x61dafb : 0x0ea5e9);
    mat.opacity = isDark ? 0.9 : 0.5;
    mat.needsUpdate = true;
  }, [isDark]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        map={texture}
        color={isDark ? 0x61dafb : 0x0ea5e9}
        transparent
        opacity={isDark ? 0.9 : 0.5}
        alphaTest={0.01}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function ReactModel() {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF('/models/react-logo.glb');

  useFrame((state) => {
    if (!ref.current) return;
    const targetX = state.pointer.y * Math.PI;
    const targetY = state.pointer.x * Math.PI;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.05;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.05;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <primitive ref={ref} object={scene} scale={1.5} rotation={[0.2, 0, 0]} />
    </Float>
  );
}

useGLTF.preload('/models/react-logo.glb');

export const HeroScene = ({ className }: HeroSceneProps) => {
  const { resolvedTheme } = useTheme();
  const isMounted = useIsMounted();
  const isDark = isMounted ? resolvedTheme === 'dark' : false;

  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 6] }}
      eventSource={document.getElementById('hero-section') as HTMLElement}
      eventPrefix="client"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />

      <Particles isDark={isDark} />

      <Suspense fallback={null}>
        <ReactModel />
      </Suspense>

      <Environment preset="city" />
    </Canvas>
  );
};;
