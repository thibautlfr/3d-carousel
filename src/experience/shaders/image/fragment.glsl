uniform sampler2D uTexture;
uniform float uVignetteOffset;
uniform float uVignetteDarkness;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uStereoRadius;
uniform float uStereoStrength;
varying vec2 vUv;

void main() {
    vec2 screenUv = gl_FragCoord.xy / uResolution;

    float aspect = uResolution.x / uResolution.y;
    vec2 diff = screenUv - uMouse;
    diff.x *= aspect;

    float dist = length(diff);

    float mask = smoothstep(uStereoRadius, 0.0, dist);

    vec2 dir = dist > 0.001 ? normalize(diff) : vec2(0.0);

    vec2 uvOffset = dir * uStereoStrength * mask;
    uvOffset.x /= aspect;

    // Chromatic aberration: shift R forward, keep G centered, shift B backward
    // along the radial direction ; creates the RGB split (stereo) look
    float r = texture2D(uTexture, vUv + uvOffset).r;
    float g = texture2D(uTexture, vUv).g;
    float b = texture2D(uTexture, vUv - uvOffset).b;
    float a = texture2D(uTexture, vUv).a;

    vec4 color = vec4(r, g, b, a);

    // Vignette effect
    vec2 uv = (vUv - vec2(0.5)) * vec2(uVignetteOffset);
    color.rgb *= 1.0 - dot(uv, uv) * uVignetteDarkness;

    gl_FragColor = color;
}
