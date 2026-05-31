import * as THREE from "three";
import type Sizes from "./utils/sizes.ts";
import type Debug from "./utils/debug.ts";

export default class Camera {
	instance: THREE.PerspectiveCamera;
	private sizes: Sizes;
	private z: number;

	constructor(_canvas: HTMLCanvasElement, scene: THREE.Scene, sizes: Sizes, debug: Debug) {
		this.sizes = sizes;
		this.z = this.getZ();

		this.instance = new THREE.PerspectiveCamera(
			45,
			sizes.width / sizes.height,
			0.1,
			100,
		);
		this.instance.position.set(0, 0, this.z);
		scene.add(this.instance);

		if (debug.active && debug.ui) {
			const folder = debug.ui.addFolder("Camera");
			folder.add(this.instance.position, "x", -20, 20, 0.1);
			folder.add(this.instance.position, "y", -20, 20, 0.1);
			folder.add(this.instance.position, "z", -20, 20, 0.1);
		}
	}

	private getZ(): number {
		if (this.sizes.isMobile) return 4;
		if (this.sizes.isTablet) return 2;
		return 1;
	}

	resize() {
		this.z = this.getZ();
		this.instance.position.set(0, 0, this.z);
		this.instance.aspect = this.sizes.width / this.sizes.height;
		this.instance.updateProjectionMatrix();
	}

	update() {
	}

	destroy() {
	}
}
