precision mediump float;

uniform float uOffset;
uniform float uMultiply;

varying vec2 vUv;
varying float vElevation;
varying vec3 vDepthColor;
varying vec3 vSurfaceColor;

void main(){

    // float colorR = step(sin(vUv.x*80.0),.5);
    // float colorG = step(sin(vUv.y*80.0),.5);
    // float colorB = step(sin(vUv.x*80.0),.5);
    
    // vec3 color = vec3(vPos*vUv+.5,0.5);

    float mixStrength = (vElevation + uOffset) * uMultiply;

    vec3 color = mix(vDepthColor,vSurfaceColor,mixStrength);

    gl_FragColor = vec4(color,1.0);
}