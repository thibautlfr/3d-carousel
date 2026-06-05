import * as THREE from "three";
import Experience from "../experience.ts";
import fragmentShader from "../shaders/image/fragment.glsl";
import vertexShader from "../shaders/image/vertex.glsl";
export default class Image {
	readonly mesh: THREE.Mesh;
	private readonly time;

	get uniforms() {
		return (this.mesh.material as THREE.ShaderMaterial).uniforms;
	}

	constructor(texture: THREE.Texture) {
		const experience = Experience.getInstance();
		this.time = experience.time;
		const { sizes } = experience;
		texture.colorSpace = THREE.NoColorSpace;
		const img = texture.image as HTMLImageElement;
		const aspect = img.width / img.height;
		const height = 1;
		const geometry = new THREE.PlaneGeometry(height * aspect, height, 32, 32);
		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				uFrequency: { value: new THREE.Vector2(3.5, 0) },
				uTime: { value: 0 },
				uTexture: { value: texture },
				uVignetteOffset: { value: 1.0 },
				uVignetteDarkness: { value: 1.0 },
				uMouse: { value: new THREE.Vector2(0.5, 0.5) },
				uResolution: {
					value: new THREE.Vector2(
						sizes.width * sizes.pixelRatio,
						sizes.height * sizes.pixelRatio,
					),
				},
				uStereoRadius: { value: 0.2 },
				uStereoStrength: { value: 0.04 },
			},
			side: THREE.DoubleSide,
			transparent: true,
			wireframe: false,
		});

		this.mesh = new THREE.Mesh(geometry, material);

		this.time.emitter.on("tick", this.onTick);
	}

	onTick = () => {
		(this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value =
			this.time.elapsed;
	};

	unsubscribeTick = () => {
		this.time.emitter.off("tick", this.onTick);
	};

	destroy() {
		this.unsubscribeTick();
		this.mesh.geometry.dispose();
		(this.mesh.material as THREE.Material).dispose();
	}
}
