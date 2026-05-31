import * as THREE from "three";
import type Debug from "../utils/debug.ts";

export default class Cube {
	private readonly mesh: THREE.Mesh;

	constructor(scene: THREE.Scene, debug: Debug) {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshStandardMaterial({ color: 0x6699cc });

		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.castShadow = true;
		this.mesh.position.y = 0.5;
		scene.add(this.mesh);

		if (debug.active && debug.ui) {
			const folder = debug.ui.addFolder("Cube");
			folder.addColor(material, "color");
			folder.add(material, "wireframe");
			folder.add(this.mesh.position, "x", -5, 5, 0.01);
			folder.add(this.mesh.position, "y", -5, 5, 0.01);
			folder.add(this.mesh.position, "z", -5, 5, 0.01);
		}
	}

	update() {
		this.mesh.rotation.y += 0.005;
	}
}
