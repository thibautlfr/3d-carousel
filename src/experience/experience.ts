import * as THREE from "three";
import Camera from "./camera.ts";
import Renderer from "./renderer.ts";
import {sources} from "./sources.ts";
import Debug from "./utils/debug.ts";
import Resources from "./utils/resources.ts";
import Sizes from "./utils/sizes.ts";
import Time from "./utils/time.ts";
import World from "./world/world.ts";

declare global {
	interface Window {
		experience: Experience;
	}
}

export default class Experience {
	private static instance: Experience | null = null;

	canvas: HTMLCanvasElement;
	sizes: Sizes;
	scene: THREE.Scene;
	camera: Camera;
	renderer: Renderer;
	world: World;
	debug: Debug;
	time: Time;
	resources: Resources;

	static getInstance(canvas?: HTMLCanvasElement): Experience {
		if (!Experience.instance) {
			if (!canvas)
				throw new Error("Canvas is required to initialize Experience");
			Experience.instance = new Experience(canvas);
		}
		return Experience.instance;
	}

	private constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;

		this.debug = new Debug();
		this.sizes = new Sizes();
		this.time = new Time();
		this.scene = new THREE.Scene();
		this.resources = new Resources(sources);
		this.camera = new Camera(canvas, this.scene, this.sizes);
		this.renderer = new Renderer(canvas, this.scene, this.sizes, this.camera);
		this.world = new World(this.scene, this.resources, this.debug);

		this.debug.initStats(this.renderer.instance);

		this.sizes.emitter.on("resize", () => this.resize());
		this.time.emitter.on("tick", () => this.update());

		window.experience = this;
	}

	private resize() {
		this.camera.resize();
		this.renderer.resize();
	}

	private update() {
		this.debug.begin();

		this.camera.update();
		this.world.update();
		this.renderer.update();

		this.debug.end();
	}

	destroy() {
		this.time.destroy();
		this.sizes.destroy();
		this.world.destroy();
		this.camera.destroy();
		this.renderer.instance.dispose();
		this.debug.destroy();
		this.resources.destroy();

		this.scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.geometry.dispose();
				if (Array.isArray(child.material)) {
					for (const material of child.material) {
						material.dispose();
					}
				} else {
					child.material.dispose();
				}
			}
		});

		Experience.instance = null;
	}
}
