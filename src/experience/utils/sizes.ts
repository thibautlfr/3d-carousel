import mitt from "mitt";

type SizesEvents = {
	resize: undefined;
};

export default class Sizes {
	static readonly MOBILE = 768;
	static readonly TABLET = 1024;

	width: number;
	height: number;
	pixelRatio: number;
	isMobile: boolean;
	isTablet: boolean;
	readonly emitter = mitt<SizesEvents>();

	private handleResize = () => {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.pixelRatio = Math.min(window.devicePixelRatio, 2);
		this.isMobile = this.width < Sizes.MOBILE;
		this.isTablet = this.width >= Sizes.MOBILE && this.width < Sizes.TABLET;
		this.emitter.emit("resize");
	};

	constructor() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.pixelRatio = Math.min(window.devicePixelRatio, 2);
		this.isMobile = this.width < Sizes.MOBILE;
		this.isTablet = this.width >= Sizes.MOBILE && this.width < Sizes.TABLET;

		window.addEventListener("resize", this.handleResize);
	}

	destroy() {
		window.removeEventListener("resize", this.handleResize);
	}
}
