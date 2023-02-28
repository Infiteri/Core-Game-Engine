export class BoxGeometry {
  constructor(w, h) {
    this.type = 'Box'

    this.data = [
      0,
      0,
      0,
      0,
      0,

      //
      0,
      h,
      0,
      0,
      1,

      //
      w,
      h,
      0,
      1,
      1,

      //
      w,
      h,
      0,
      1,
      1,

      //
      w,
      0,
      0,
      1,
      0,

      //
      0,
      0,
      0,
      0,
      0,
    ]
  }
}
