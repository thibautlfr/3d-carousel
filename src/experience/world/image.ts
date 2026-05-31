import * as THREE from "three"

export default class Image {
    readonly mesh: THREE.Mesh;

    constructor(texture: THREE.Texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        const img = texture.image as HTMLImageElement;
        const aspect = img.width / img.height;
        const height = 1;
        const geometry = new THREE.PlaneGeometry(height * aspect, height);
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(geometry, material);
    }

    destroy() {
        this.mesh.geometry.dispose();
        (this.mesh.material as THREE.Material).dispose();
    }
}
