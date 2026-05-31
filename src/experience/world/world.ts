import * as THREE from "three";
import type Debug from "../utils/debug.ts";
import type Resources from "../utils/resources.ts";
import Cube from "./cube.ts";

export default class World {
	private cube: Cube | null = null;
	private readonly unsubscribeReady: () => void;

	constructor(scene: THREE.Scene, resources: Resources, debug: Debug) {
		const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
		directionalLight.castShadow = true;
		directionalLight.shadow.camera.far = 15;
		directionalLight.shadow.mapSize.set(1024, 1024);
		directionalLight.position.set(3.5, 2, -1.25);
		scene.add(directionalLight);

		const grid = new THREE.GridHelper(10, 10, "#444444", "#2a2a2a");
		scene.add(grid);

		const floor = new THREE.Mesh(
			new THREE.PlaneGeometry(10, 10),
			new THREE.ShadowMaterial({ opacity: 0.15 }),
		);
		floor.rotation.x = -Math.PI * 0.5;
		floor.receiveShadow = true;
		scene.add(floor);

		const onReady = () => {
			this.cube = new Cube(scene, debug);
		};

		resources.emitter.on("ready", onReady);
		this.unsubscribeReady = () => resources.emitter.off("ready", onReady);
	}

	update() {
		this.cube?.update();
	}

	destroy() {
		this.unsubscribeReady();
	}
}
