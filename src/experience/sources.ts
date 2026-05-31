import type * as THREE from "three";
import type {GLTF} from "three/addons";

export interface TextureSource {
	readonly name: string;
	readonly type: "texture";
	readonly path: string;
}

export interface CubeTextureSource {
	readonly name: string;
	readonly type: "cubeTexture";
	readonly path: readonly [string, string, string, string, string, string];
}

export interface GltfSource {
	readonly name: string;
	readonly type: "gltfModel";
	readonly path: string;
}

export type Source = TextureSource | CubeTextureSource | GltfSource;

export type LoadedAsset = THREE.Texture | THREE.CubeTexture | GLTF;

export const sources: Source[] = [];
