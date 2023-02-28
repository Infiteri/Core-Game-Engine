import { Shader } from '../Shader.js'

const vsSource = `
  attribute vec3 aPosition;

  uniform mat4 uCameraMatrix;
  uniform mat4 uEntityMatrix;

  void main() {
    gl_Position = uCameraMatrix * uEntityMatrix * vec4(aPosition, 1);
  }
`

const fsSource = `
  precision mediump float;

  uniform vec4 uColor;

  void main() { 
    gl_FragColor = uColor;
  }
`

export class ColorShader extends Shader {
  constructor() {
    super('ColorShader', vsSource, fsSource)
  }
}
