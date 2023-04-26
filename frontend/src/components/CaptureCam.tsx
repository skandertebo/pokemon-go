import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Spawn } from '../types/Spawn';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//@ts-ignore
import TouchControls from '../assets/threeControls/TouchControls.js';
import { Button, Typography } from '@material-tailwind/react';

enum CapturingState {
  NOT_STARTED,
  CAPTURING,
  CAPTURED
}

const CaptureCam: React.FC<{
  spawn: Spawn;
  captureAction: (spawn: Spawn) => void;
}> = ({ spawn, captureAction }) => {
  const modelRef = useRef<THREE.Group | undefined>();
  const cameraRef = useRef<THREE.Camera | undefined>();
  const sceneRef = useRef<THREE.Scene | undefined>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const isReadyRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | undefined>(); // for cleanup

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Set up scene and renderer
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(100, 100, 32);
    const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('/models/grass/oeeb7_2K_Albedo.jpg'),
      side: THREE.DoubleSide
    });

    // make a plane
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0, 0);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    scene.background = new THREE.Color(0x118484);

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);
    cameraRef.current = camera;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({
      //alpha: true,
      canvas: document.getElementById('capture-cam-canvas') as HTMLCanvasElement
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // load models
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/models/animals/scene.gltf', (gltf) => {
      scene.add(gltf.scene);
    });
    gltfLoader.load('/models/bird_orange/scene.gltf', (gltf) => {
      const position = [0, 0, 1];
      gltf.scene.position.set(position[0], position[1], position[2]);

      scene.add(gltf.scene);
      modelRef.current = gltf.scene;
    });

    sceneRef.current = scene;

    // Set up controls
    let options = {
      delta: 0.75, // coefficient of movement
      moveSpeed: 0.01, // speed of movement
      rotationSpeed: 0.002, // coefficient of rotation
      maxPitch: 20, // max camera pitch angle
      hitTest: true, // stop on hitting objects
      hitTestDistance: 40 // distance to test for hit
    };
    const controls = new TouchControls(
      document.getElementById('capture-cam-wrapper'),
      camera,
      options
    );
    controls.setPosition(0, 2, 5);
    controls.addToScene(scene);

    // handle resize
    window.addEventListener('resize', () => {
      handleResize(camera, renderer);
    });

    // Render loop
    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);
      modelRef.current && highlightObjectOnVisible(camera, modelRef.current);
      if (modelRef.current && canCaptureObject(camera, modelRef.current)) {
        if (!isReadyRef.current) {
          setIsReady(true);
          isReadyRef.current = true;
        }
      } else {
        if (isReadyRef.current) {
          setIsReady(false);
          isReadyRef.current = false;
        }
      }
      controls.update(1 / 60);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      document.body.style.overflow = 'auto';
      animationFrameRef.current &&
        cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', () =>
        handleResize(camera, renderer)
      );
    };
  }, []);

  return createPortal(
    <div
      id='capture-cam-wrapper'
      className='absolute top-0 h-screen w-screen bg-black bg-opacity-90 z-20 flex p-0 overflow-hidden'
    >
      <div className='absolute top-2 w-full flex flex-col items-center gap-4 z-30 p-2 px-6 bg-blue-gray-300'>
        <Typography variant='h6' color='white' className='text-center'>
          Find the pokemon and press on capture
        </Typography>
        <Button
          color='blue'
          disabled={!isReady}
          onClick={() => captureAction(spawn)}
        >
          Capture
        </Button>
      </div>
      <div id='3d-container' className='absolute h-screen w-screen'>
        <canvas id='capture-cam-canvas'></canvas>
      </div>
    </div>,
    document.body
  );
};

const isObjectVisibleToCamera = (camera: THREE.Camera, object: THREE.Group) => {
  const frustum = new THREE.Frustum();
  frustum.setFromProjectionMatrix(
    new THREE.Matrix4().multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    )
  );
  return frustum.containsPoint(object.position);
};

const distanceFromCameraToObject = (
  camera: THREE.PerspectiveCamera,
  object: THREE.Group
) => {
  const cameraPosition = new THREE.Vector3();
  const objectPosition = new THREE.Vector3();
  camera.getWorldPosition(cameraPosition);
  object.getWorldPosition(objectPosition);
  return cameraPosition.distanceTo(objectPosition);
};

const maximumCaptureDistance = 10;

const highlightObjectOnVisible = (
  camera: THREE.PerspectiveCamera,
  object: THREE.Group
) => {
  if (canCaptureObject(camera, object)) {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.emissive.set(0x2222ff);
        child.material.emissiveIntensity = 8;
      }
    });
    return true;
  } else {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.emissive.set(0xffffff);
        child.material.emissiveIntensity = 1;
      }
    });
    return false;
  }
};

const canCaptureObject = (
  camera: THREE.PerspectiveCamera,
  object: THREE.Group
) => {
  return (
    isObjectVisibleToCamera(camera, object) &&
    distanceFromCameraToObject(camera, object) < maximumCaptureDistance
  );
};

const handleResize = (
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

export default CaptureCam;
