import "./style.css";
import Experience from "./experience/experience.ts";

const canvas = document.querySelector<HTMLCanvasElement>("canvas.webgl");
if (!canvas) throw new Error("Canvas element not found");

const experience = Experience.getInstance(canvas);

const loader = document.querySelector<HTMLDivElement>(".loader");
const loaderProgress =
	document.querySelector<HTMLSpanElement>(".loader__progress");

if (loader && loaderProgress) {
	experience.resources.emitter.on("progress", ({ loaded, total }) => {
		loaderProgress.textContent = `${Math.round((loaded / total) * 100)}%`;
	});

	experience.resources.emitter.on("ready", () => {
		loader.classList.add("loaded");
		loader.addEventListener("transitionend", () => loader.remove());
	});
}
