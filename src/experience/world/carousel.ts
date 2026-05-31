import * as THREE from "three"
import type Debug from "../utils/debug.ts"
import Image from "./image.ts"
import type Sizes from "../utils/sizes.ts";

export default class Carousel {
    private readonly group: THREE.Group;
    private readonly images: Image[] = [];
    private readonly sizes: Sizes;
    velocity = 0;
    friction = 0.70;
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

    constructor(scene: THREE.Scene, sizes: Sizes, debug: Debug) {
        this.sizes = sizes;
        this.group = new THREE.Group();
        scene.add(this.group);

        this.friction = sizes.isMobile ? 0.95 : 0.70;

        const count = 12;
        const radius = 4.5;

        for (let i = 0; i < count; i++) {
            const image = new Image();
            const angle = (i / count) * Math.PI * 2;

            image.mesh.position.x = Math.sin(angle) * radius;
            image.mesh.position.z = Math.cos(angle) * radius;
            image.mesh.lookAt(0, 0, 0);

            this.group.add(image.mesh);
            this.images.push(image);
        }

        this.group.position.z = 3;

        window.addEventListener("wheel", this.handleWheel);
        window.addEventListener("touchstart", this.handleTouchStart);
        window.addEventListener("touchmove", this.handleTouchMove);

        if (debug.active && debug.ui) {
            const folder = debug.ui.addFolder("Carousel");
            folder.add(this, "friction", 0, 0.99, 0.001);
            folder.add(this, "scrollSensitivity", 0.0001, 0.002, 0.0001);
            folder.add({ count }, "count", 1, 20, 1).onFinishChange((v: number) => {
                this.rebuild(v, radius);
            });
            folder.add({ radius }, "radius", 1, 15, 0.5).onFinishChange((v: number) => {
                this.rebuild(this.images.length, v);
            });
        }
    }

    private rebuild(count: number, radius: number) {
        for (const image of this.images) {
            this.group.remove(image.mesh);
            image.destroy();
        }
        this.images.length = 0;

        for (let i = 0; i < count; i++) {
            const image = new Image();
            const angle = (i / count) * Math.PI * 2;

            image.mesh.position.x = Math.sin(angle) * radius;
            image.mesh.position.z = Math.cos(angle) * radius;
            image.mesh.lookAt(0, 0, 0);

            this.group.add(image.mesh);
            this.images.push(image);
        }
    }

    resize() {
        this.friction = this.sizes.isMobile ? 0.95 : 0.70;
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
