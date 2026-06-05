uniform sampler2D uTexture;
uniform float uVignetteOffset;
uniform float uVignetteDarkness;
varying vec2 vUv;

void main() {
    vec4 color = texture2D(uTexture, vUv);

    // Vignette effect
    vec2 uv = (vUv - vec2(0.5)) * vec2(uVignetteOffset);
    color.rgb *= 1.0 - dot(uv, uv) * uVignetteDarkness;

    gl_FragColor = color ;
}