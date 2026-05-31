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

const imageNames = [
	"marnie006", "marnie007", "marnie008", "marnie009",
	"marnie010", "marnie011", "marnie012", "marnie013",
	"marnie014", "marnie015", "marnie016", "marnie017",
] as const;

export const sources: Source[] = imageNames.map((name) => ({
	name,
	type: "texture",
	path: `/textures/${name}.jpg`,
}));
