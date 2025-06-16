precision mediump float;

uniform vec3 uColorTop;
uniform vec3 uColorBottom;
varying vec3 vWorldPosition;

void main() {
  float h = normalize(vWorldPosition).y * 0.5 + 0.5;
  vec3 color = mix(uColorBottom, uColorTop, h);
  gl_FragColor = vec4(color, 1.0);
}
