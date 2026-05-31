import * as THREE from "three";
import type Debug from "../utils/debug.ts";
import type Resources from "../utils/resources.ts";
import type Sizes from "../utils/sizes.ts";
import Carousel from "./carousel.ts";

export default class World {
	private carousel: Carousel | null = null;
	private readonly unsubscribeReady: () => void;

	constructor(scene: THREE.Scene, resources: Resources, sizes: Sizes, debug: Debug) {
		const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
		directionalLight.castShadow = true;
		directionalLight.shadow.camera.far = 15;
		directionalLight.shadow.mapSize.set(1024, 1024);
		directionalLight.position.set(3.5, 2, -1.25);
		scene.add(directionalLight);

		// scene.background = new THREE.Color(0xffffff);

		const onReady = () => {
			this.carousel = new Carousel(scene, sizes, debug);
		};

		resources.emitter.on("ready", onReady);
		this.unsubscribeReady = () => resources.emitter.off("ready", onReady);
	}

	resize() {
		this.carousel?.resize();
	}

	update() {
		this.carousel?.update();
	}

	destroy() {
		this.unsubscribeReady();
		this.carousel?.destroy();
	}
}
