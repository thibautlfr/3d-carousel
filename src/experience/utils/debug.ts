import GUI from "lil-gui";
import Stats from "stats-gl";
import type * as THREE from "three";

export default class Debug {
	active: boolean;
	ui: GUI | undefined;
	stats: Stats | undefined;

	private handleKeydown = (e: KeyboardEvent) => {
		if (e.key === "h") this.toggle();
	};

	constructor() {
		this.active = window.location.hash === "#debug";

		if (this.active) {
			this.ui = new GUI();
			this.stats = new Stats({ trackGPU: true });
		}

		window.addEventListener("keydown", this.handleKeydown);
	}

	initStats(renderer: THREE.WebGLRenderer) {
		if (!this.stats) return;
		document.body.appendChild(this.stats.dom);
		this.stats.init(renderer);
	}

	private toggle() {
		if (!this.ui || !this.stats) return;

		if (this.ui._hidden) {
			this.ui.show();
			this.stats.dom.style.display = "";
		} else {
			this.ui.hide();
			this.stats.dom.style.display = "none";
		}
	}

	begin() {
		this.stats?.begin();
	}

	end() {
		this.stats?.end();
		this.stats?.update();
	}

	destroy() {
		window.removeEventListener("keydown", this.handleKeydown);
		this.ui?.destroy();
		this.stats?.dom.remove();
	}
}
