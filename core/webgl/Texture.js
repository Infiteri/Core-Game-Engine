import { gl } from '../core.js'

export class Texture {
  static unit = -1

  constructor(src) {
    Texture.unit++

    this.unit = Texture.unit
    this.src = src

    this.handle = gl.createTexture()
    this.image = new Image()

    //Bind
    this.Bind()

    //Tex initial
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([255, 255, 255, 255])
    )

    //Unbind
    this.Unbind() // Free for other textures to bind / do their stuff
  }

  Load() {
    //Image onload callback
    this.image.onload = () => {
      this.Bind()

      //Pass The image data
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        this.image
      )

      const { width, height } = this.image

      //Power of 2 image
      if (this._Po2(width) && this._Po2(height)) {
        gl.generateMipmap(gl.TEXTURE_2D) //Gen mipmap
      } else {
        //Clamp to edge in the u / v space coords
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      }

      //Filter it
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    }

    //Reach for the image
    this.image.src = this.src

    this.Unbind()
  }

  /** @private IsPowerOf2 function */
  _Po2(v) {
    return (v & (v - 1)) === 0
  }

  Activate() {
    gl.activeTexture(gl.TEXTURE0 + this.unit)
    this.Bind()
  }

  Bind() {
    gl.bindTexture(gl.TEXTURE_2D, this.handle)
  }

  Unbind() {
    gl.bindTexture(gl.TEXTURE_2D, null)
  }
}
