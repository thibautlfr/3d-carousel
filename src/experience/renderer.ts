import * as THREE from "three";
import type Camera from "./camera.ts";
import type Sizes from "./utils/sizes.ts";

export default class Renderer {
	instance: THREE.WebGLRenderer;
	private sizes: Sizes;
	private readonly scene: THREE.Scene;
	private camera: Camera;

	constructor(
		canvas: HTMLCanvasElement,
		scene: THREE.Scene,
		sizes: Sizes,
		camera: Camera,
	) {
		this.sizes = sizes;
		this.scene = scene;
		this.camera = camera;

		this.instance = new THREE.WebGLRenderer({ canvas, antialias: true });
		this.instance.shadowMap.enabled = true;
		this.instance.shadowMap.type = THREE.PCFShadowMap;
		this.instance.setClearColor("#1a1a1a");
		this.instance.setSize(sizes.width, sizes.height);
		this.instance.setPixelRatio(sizes.pixelRatio);
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.pixelRatio);
	}

	update() {
		this.instance.render(this.scene, this.camera.instance);
	}
}
