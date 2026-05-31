import "./style.css";
import Experience from "./experience/experience.ts";

const canvas = document.querySelector<HTMLCanvasElement>("canvas.webgl");
if (!canvas) throw new Error("Canvas element not found");
Experience.getInstance(canvas);
