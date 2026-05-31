import mitt from "mitt";
import * as THREE from "three";
import {GLTFLoader} from "three/addons";
import type {LoadedAsset, Source} from "../sources.ts";

type ResourcesEvents = {
	ready: undefined;
	progress: { loaded: number; total: number };
};

export default class Resources {
	private readonly items = new Map<string, LoadedAsset>();
	private readonly toLoad: number;
	private loaded = 0;
	readonly emitter = mitt<ResourcesEvents>();

	private readonly gltfLoader = new GLTFLoader();
	private readonly textureLoader = new THREE.TextureLoader();
	private readonly cubeTextureLoader = new THREE.CubeTextureLoader();

	constructor(sources: Source[]) {
		this.toLoad = sources.length;

		if (this.toLoad === 0) {
			queueMicrotask(() => this.emitter.emit("ready"));
			return;
		}

		this.startLoading(sources);
	}

	get(name: string): LoadedAsset {
		const item = this.items.get(name);
		if (item === undefined) {
			throw new Error(`Resource "${name}" is not loaded yet`);
		}
		return item;
	}

	destroy() {
		this.items.clear();
	}

	private onSourceLoaded(name: string, asset: LoadedAsset): void {
		this.items.set(name, asset);
		this.loaded++;

		this.emitter.emit("progress", {
			loaded: this.loaded,
			total: this.toLoad,
		});

		if (this.loaded === this.toLoad) {
			this.emitter.emit("ready");
		}
	}

	private startLoading(sources: Source[]): void {
		for (const source of sources) {
			if (source.type === "gltfModel") {
				this.gltfLoader.load(source.path, (file) => {
					this.onSourceLoaded(source.name, file);
				});
			} else if (source.type === "texture") {
				this.textureLoader.load(source.path, (file) => {
					this.onSourceLoaded(source.name, file);
				});
			} else if (source.type === "cubeTexture") {
				this.cubeTextureLoader.load([...source.path], (file) => {
					this.onSourceLoaded(source.name, file);
				});
			}
		}
	}
}
