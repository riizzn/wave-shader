export const vertex = `
uniform float uAmplitude;
uniform float uWaveLength;
uniform float uTime;
void main(){

vec3 newPosition = position;

float wave = uAmplitude * sin(position.x * uWaveLength + uTime );

newPosition.z += wave;
 gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

export const fragment = `
void main(){
gl_FragColor=vec4(1.,0.,0.,1.);
}`;
