import * as THREE from "three";
import Experience from "./experience.ts";

export default class Renderer {
	instance: THREE.WebGLRenderer;
	private sizes;
	private readonly scene;
	private camera;

	constructor() {
		const { canvas, scene, sizes, camera } = Experience.getInstance();
		this.sizes = sizes;
		this.scene = scene;
		this.camera = camera;

		this.instance = new THREE.WebGLRenderer({ canvas, antialias: true });
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
