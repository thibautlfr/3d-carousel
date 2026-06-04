uniform sampler2D uTexture;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
      float strength = 1.2 - distance(vUv, vec2(0.5));

      vec4 color = texture2D(uTexture, vUv);
      gl_FragColor = color * strength ;
  }