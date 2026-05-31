import * as THREE from "three"

export default class Image {
    readonly mesh: THREE.Mesh;

    constructor() {
        const geometry = new THREE.PlaneGeometry(2, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide },);
        this.mesh = new THREE.Mesh(geometry, material);
    }

    destroy() {
        this.mesh.geometry.dispose();
        (this.mesh.material as THREE.Material).dispose();
    }
}
