import glsl from "vite-plugin-glsl"

export default {
  base: process.env.NODE_ENV === "production" ? "/3d-carousel/" : "/",
  plugins: [
    glsl()
  ]
}