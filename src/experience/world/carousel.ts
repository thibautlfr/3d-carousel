import * as THREE from "three";
import Experience from "../experience.ts";
import Image from "./image.ts";

export default class Carousel {
	private readonly group: THREE.Group;
	private readonly images: Image[] = [];
	private readonly textures: THREE.Texture[];
	private readonly sizes;
	velocity = 0;
	friction = 0.7;
	scrollSensitivity = 0.0002;
	private lastTouchY = 0;

	private handleWheel = (e: WheelEvent) => {
		this.velocity += e.deltaY * this.scrollSensitivity;
	};

	private handleTouchStart = (e: TouchEvent) => {
		this.velocity = 0;
		this.lastTouchY = e.touches[0].clientY;
	};

	private handleTouchMove = (e: TouchEvent) => {
		const y = e.touches[0].clientY;
		this.velocity += (this.lastTouchY - y) * this.scrollSensitivity;
		this.lastTouchY = y;
	};

	constructor() {
		const { scene, resources, sizes } = Experience.getInstance();
		this.sizes = sizes;
		this.group = new THREE.Group();
		scene.add(this.group);

		this.textures = [
			"marnie006",
			"marnie007",
			"marnie008",
			"marnie009",
			"marnie010",
			"marnie011",
			"marnie012",
			"marnie013",
			"marnie014",
			"marnie015",
			"marnie016",
			"marnie017",
		].map((name) => resources.get(name) as THREE.Texture);

		this.friction = sizes.isMobile ? 0.95 : 0.7;

		const radius = 4.5;

		this.build(radius);

		this.group.position.z = 3;

		window.addEventListener("wheel", this.handleWheel);
		window.addEventListener("touchstart", this.handleTouchStart);
		window.addEventListener("touchmove", this.handleTouchMove);

		this.setupDebug(radius);
	}

	private build(radius: number) {
		for (const image of this.images) {
			this.group.remove(image.mesh);
			image.destroy();
		}
		this.images.length = 0;

		const count = this.textures.length;

		for (let i = 0; i < count; i++) {
			const image = new Image(this.textures[i]);
			const angle = (i / count) * Math.PI * 2;

			image.mesh.position.x = Math.sin(angle) * radius;
			image.mesh.position.z = Math.cos(angle) * radius;
			image.mesh.lookAt(0, 0, 0);

			this.group.add(image.mesh);
			this.images.push(image);
		}
	}

	private setupDebug(radius: number) {
		const { debug } = Experience.getInstance();
		if (!debug.active || !debug.ui) return;

		const folder = debug.ui.addFolder("Carousel");
		folder.add(this, "friction", 0, 0.99, 0.001);
		folder.add(this, "scrollSensitivity", 0.0001, 0.002, 0.0001);
		folder.add({ radius }, "radius", 1, 15, 0.5).onFinishChange((v: number) => {
			this.build(v);
		});

		const shaderFolder = debug.ui.addFolder("Shader");
		const shaderParams = {
			frequencyX: 3.5,
			frequencyY: 0,
			wireframe: false,
			transparent: true,
			uVignetteOffset: 1.0,
			uVignetteDarkness: 1.0,
		};
		const setAll = (fn: (u: THREE.ShaderMaterial["uniforms"]) => void) => {
			for (const image of this.images) fn(image.uniforms);
		};
		shaderFolder
			.add(shaderParams, "frequencyX", 0, 30, 0.1)
			.onChange((v: number) => {
				setAll((u) => {
					u.uFrequency.value.x = v;
				});
			});
		shaderFolder
			.add(shaderParams, "frequencyY", 0, 30, 0.1)
			.onChange((v: number) => {
				setAll((u) => {
					u.uFrequency.value.y = v;
				});
			});
		shaderFolder.add(shaderParams, "wireframe").onChange((v: boolean) => {
			for (const image of this.images) {
				(image.mesh.material as THREE.ShaderMaterial).wireframe = v;
			}
		});
		shaderFolder.add(shaderParams, "transparent").onChange((v: boolean) => {
			for (const image of this.images) {
				(image.mesh.material as THREE.ShaderMaterial).transparent = v;
			}
		});
		shaderFolder
			.add(shaderParams, "uVignetteOffset", 0, 2, 0.1)
			.onChange((v: number) => {
				setAll((u) => {
					u.uVignetteOffset.value = v;
				});
			});
		shaderFolder
			.add(shaderParams, "uVignetteDarkness", 0, 5, 0.1)
			.onChange((v: number) => {
				setAll((u) => {
					u.uVignetteDarkness.value = v;
				});
			});
	}

	resize() {
		this.friction = this.sizes.isMobile ? 0.95 : 0.7;
	}

	update() {
		this.group.rotation.y += this.velocity;
		this.velocity *= this.friction;
	}

	destroy() {
		window.removeEventListener("wheel", this.handleWheel);
		window.removeEventListener("touchstart", this.handleTouchStart);
		window.removeEventListener("touchmove", this.handleTouchMove);
		for (const image of this.images) {
			image.destroy();
		}
	}
}
