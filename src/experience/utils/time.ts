import mitt from "mitt";

type TimeEvent = {
	tick: undefined;
};

export default class Time {
	start: number;
	current: number;
	elapsed: number;
	delta: number;
	readonly emitter = mitt<TimeEvent>();
	private animationFrameId = 0;

	constructor() {
		this.start = performance.now();
		this.current = this.start;
		this.elapsed = 0;
		this.delta = 16;

		this.animationFrameId = window.requestAnimationFrame((t) => this.tick(t));
	}

	private tick(timestamp: number) {
		this.delta = timestamp - this.current;
		this.current = timestamp;
		this.elapsed = this.current - this.start;

		this.emitter.emit("tick");

		this.animationFrameId = window.requestAnimationFrame((t) => this.tick(t));
	}

	destroy() {
		cancelAnimationFrame(this.animationFrameId);
	}
}
