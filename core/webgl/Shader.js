import { gl } from '../core.js'

export class Shader {
  /**@private */
  name

  /**
   * Load the shader under a specific name
   *
   * @param {string} name
   * @param {string} vsSource
   * @param {string} fsSource
   */
  constructor(name, vsSource, fsSource) {
    this.name = name

    const vertexShader = this.LoadShader(gl.VERTEX_SHADER, vsSource)
    const fragmentShader = this.LoadShader(gl.FRAGMENT_SHADER, fsSource)

    this.program = this.LoadProgram(vertexShader, fragmentShader)

    this.attributes = {}
    this.uniforms = {}

    this.DetectAttributes()
    this.DetectUniforms()
  }

  //Getters
  get name() {
    return this.name
  }

  Use() {
    gl.useProgram(this.program)
  }

  UploadVec3(name, x, y, z) {
    const vec3 = this.GetUniformLocation(name)
    gl.uniform3f(vec3, x, y, z)
  }
  UploadVec3fv(name, data) {
    const vec3 = this.GetUniformLocation(name)
    gl.uniform3fv(vec3, data)
  }

  UploadVec4(name, x, y, z, w) {
    const vec3 = this.GetUniformLocation(name)
    gl.uniform4f(vec3, x, y, z, w)
  }

  UploadVec4fv(name, data) {
    const vec3 = this.GetUniformLocation(name)
    gl.uniform4fv(vec3, data)
  }

  Upload1i(name, i) {
    const loc = this.GetUniformLocation(name)
    gl.uniform1i(loc, i)
  }

  UploadMat4(name, data) {
    const mat = this.GetUniformLocation(name)
    gl.uniformMatrix4fv(mat, false, data)
  }

  GetAttributeLocation(name) {
    if (this.attributes[name] === undefined)
      throw new Error(
        `Unable to find attribute: ${name} in shader named: ${this.name}`
      )

    return this.attributes[name]
  }

  GetUniformLocation(name) {
    if (this.uniforms[name] === undefined)
      throw new Error(
        `Unable to find uniform: ${name} in shader named: ${this.name}`
      )

    return this.uniforms[name]
  }

  /** @private */
  LoadProgram(vertexShader, fragmentShader) {
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    //! ERROR Checking
    const error = gl.getProgramInfoLog(program)
    if (error !== '') {
      throw new Error(`Unable to create program: ${error} `)
    }

    return program
  }

  /** @private */
  LoadShader(type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    //! ERROR Checking
    const error = gl.getShaderInfoLog(shader)
    if (error !== '') {
      //! Get the shader type
      const shaderType =
        type === gl.FRAGMENT_SHADER ? 'FRAGMENT_SHADER' : 'VERTEX_SHADER'

      throw new Error(
        `Unable to compile shader of type ${shaderType} named ${this.name}: ${error} `
      )
    }

    return shader
  }

  /** @private */
  DetectAttributes() {
    const count = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES)

    for (let i = 0; i < count; i++) {
      const attribute = gl.getActiveAttrib(this.program, i)

      if (!attribute) break

      this.attributes[attribute.name] = gl.getAttribLocation(
        this.program,
        attribute.name
      )
    }
  }

  /** @private */
  DetectUniforms() {
    const count = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS)

    for (let i = 0; i < count; i++) {
      const uniform = gl.getActiveUniform(this.program, i)

      if (!uniform) break

      this.uniforms[uniform.name] = gl.getUniformLocation(
        this.program,
        uniform.name
      )
    }
  }
}
