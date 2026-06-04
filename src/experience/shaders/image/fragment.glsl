uniform sampler2D uTexture;
uniform float uTime;

varying vec2 vUv;

  void main() {
      vec4 color = texture2D(uTexture, vUv);
      gl_FragColor = color;
  }